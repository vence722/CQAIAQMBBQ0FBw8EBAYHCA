'use strict';

const fivebeans = require('fivebeans');
const BlueBird = require('bluebird');
const config = require('./cfg').config;

let host = config.beanstalkd_host;
let port = config.beanstalkd_port;
let tube = config.beanstalkd_tube;

/**
* emit a job to beanstalkd
* in Promise form
*
* @param {object} job - the job object to be emitted
* @function
*/
function emitJob(job) {
	return new BlueBird(function (resolve, reject) {
		let client = new fivebeans.client(host, port);
		client.on('connect', function () {
			console.log('connected');
			client.use(tube, function (err, tname) {
				if (err) {
					console.log(err);
					reject(err);
					return;
				}
				console.log('using ' + tname);
				client.put(0, 0, 60, JSON.stringify([tube, job]), function (error, jobid) {
					if (error) {
						console.log(error);
						reject(error);
						return;
					}
					console.log('queued a job in tube, jobid: ' + jobid);
					client.end();
					resolve();
				});
			});
		}).on('error', function (error) {
			console.log(error);
			reject(error);
		});
		client.connect();
	});
}

/**
* emit a job to beanstalkd with time delayed
*
* @param {object} job - the job object to be emitted
* @param {number} delaySeconds - the seconds of delay for the job
* @function
*/
function emitJobDelayed(jobIn, delaySeconds) {
	setTimeout(function (job) {
		let client = new fivebeans.client(host, port);
		client.on('connect', function () {
			console.log('connected');
			client.use(tube, function (err, tname) {
				if (err) {
					console.log(err);
					return;
				}
				console.log('using ' + tname);
				client.put(0, 0, 60, JSON.stringify([tube, job]), function (error, jobid) {
					if (error) {
						console.log(error);
						return;
					}
					console.log('queued a string reverse job in tube: ' + jobid);
					client.end();
				});
			});
		}).on('error', function (error) {
			console.log(error);
		});
		client.connect();
	}, delaySeconds * 1000, jobIn);
}

exports.emitJob = emitJob;
exports.emitJobDelayed = emitJobDelayed;
