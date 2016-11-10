'use strict';

const co = require('co');
const config = require('./cfg').config;
const currency = require('./currency');
const db = require('./db');

const connStr = 'mongodb://' + config.db_username + ':' + config.db_password + '@' + config.db_host + ':' + config.db_port + '/' + config.db_name;

module.exports = function () {
	function CurrencyHandler() {
		this.type = 'currency_handler';
	}
	CurrencyHandler.prototype.work = function (payload, callback) {
		co(function* () {
			payload = payload.split('\'').join('\"');
			console.log('payload: ' + payload);
			let obj = JSON.parse(payload);
			let from = obj.from;
			let to = obj.to;
			console.log('from: ' + from + ' to: ' + to);
			let curr = yield currency.GetCurrency(from, to).catch(function (error) {
				callback('error happened when get currentcy rate from data source: ' + error);
				return;
			});
			yield db.SaveDocument(connStr, curr).catch(function (error) {
				callback('error happened when save to mongodb: ' + error);
				return;
			});
			callback('document save successfully');
		});
	};
	let handler = new CurrencyHandler();
	return handler;
};
