'use strict';

const co = require('co');
const config = require('./cfg').config;
const currency = require('./currency');
const db = require('./db');

const connStr = 'mongodb://' + config.db_username + ':' + config.db_password + '@' + config.db_host + ':' + config.db_port + '/' + config.db_name;
const from = 'USD';
const to = 'HKD';

co(function* () {
	let curr = yield currency.GetCurrency(from, to).catch(function (error) {
		console.log('error happened when get currentcy rate from data source: ' + error);
		return;
	});
	let res = yield db.SaveDocument(connStr, curr).catch(function (error) {
		console.log('error happened when save to mongodb: ' + error);
		return;
	});
	console.log('document save successfully');
});
