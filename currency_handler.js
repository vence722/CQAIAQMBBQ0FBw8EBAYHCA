'use strict';

const co = require('co');
const config = require('./cfg').config;
const currency = require('./currency');
const db = require('./db');
const emitter = require('./job_emitter');
const model = require('./model');

const CONN_STR = 'mongodb://' + config.db_username + ':' + config.db_password + '@' + config.db_host + ':' + config.db_port + '/' + config.db_name;

module.exports = function () {
	/**
	* CurrencyHandler constructor
	*
	* @property {string} type - the identifier for beanstalkd to identify the job type
	* @constructor
	*/
	function CurrencyHandler() {
		this.type = 'currency_handler';
	}
	/**
	* the entry point function for the beanstalkd worker
	*
	* @param {object} payload - the information of the job received from beanstalkd server
	* @param {function} callback - the calback function for the job
	* @method
	*/
	CurrencyHandler.prototype.work = function (payload, callback) {
		co(function* () {
			console.log('CurrencyHandler start to work');
			// Convert payload object
			console.log('payload: from=' + payload.from + ', to=' + payload.to + ', retry_count=' + payload.retry_count + ', success_count: ' + payload.success_count);
			// HTTP GET currency rate data from data source
			console.log('start get currency rate data from data source');
			let curr = yield currency.getCurrency(payload.from, payload.to).catch(function (error) {
				console.log('error happened when get currentcy rate from data source: ' + error);
				failProcess(payload);
				callback(error);
				return;
			});
			// Save the currency data to DB
			console.log('start save the currency data to DB');
			yield db.saveDocument(CONN_STR, curr).catch(function (error) {
				console.log('error happened when save to mongodb: ' + error);
				failProcess(payload);
				callback(error);
				return;
			});
			console.log('document save successfully');
			// Handle reemit the job if not finished
			postProcess(payload);
			callback();
		});
	};
	/**
	* the function to be called when the job failed to process
	* it will compare the retry count to the limit retry count
	* if '>' then the job will be buried, otherwise the job will be re-emitted with new retry count
	*
	* @param {object} lastPayload - the payload object last time received from beanstalkd server
	* @function
	*/
	function failProcess(lastPayload) {
		console.log('fail process start');
		lastPayload.retry_count++;
		if (lastPayload.retry_count < config.job_retry_count_limit) {
			console.log('job failed, and retry_count(=' + lastPayload.retry_count + ')  < ' + config.job_retry_count_limit + ', re-emit the job after ' + config.job_retry_delay + ' seconds');
			let newJob = new model.CurrencyJob(lastPayload.from, lastPayload.to, lastPayload.retry_count, lastPayload.success_count);
			emitter.emitJobDelayed(newJob, config.job_retry_delay);
		} else {
			console.log('job failed, and retry_count(=' + lastPayload.retry_count + ') equals to ' + config.job_retry_count_limit + ', the job will be buried');
		}
	}
	/**
	* the function to be called when the job successfully processed
	* it will compare the success count to the limit process count
	* if '>' then the job will be ended successfully, otherwise the job will be re-emitted with new success count
	*
	* @param {object} lastPayload - the payload object last time received from beanstalkd server
	* @function
	*/
	function postProcess(lastPayload) {
		console.log('post process start');
		lastPayload.success_count++;
		if (lastPayload.success_count < config.job_run_count_limit) {
			console.log('success_count(=' + lastPayload.success_count + ') < ' + config.job_run_count_limit + ', re-emit the job after ' + config.job_next_delay + ' seconds');
			let newJob = new model.CurrencyJob(lastPayload.from, lastPayload.to, lastPayload.retry_count, lastPayload.success_count);
			emitter.emitJobDelayed(newJob, config.job_next_delay);
		} else {
			console.log('success_count(=' + lastPayload.success_count + ') equals to ' + config.job_run_count_limit + ', the job is finished');
		}
	}
	let handler = new CurrencyHandler();
	return handler;
};
