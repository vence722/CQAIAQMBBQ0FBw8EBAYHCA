'use strict';

const assert = require('chai').assert;
const config = require('../cfg').config;
const db = require('../db');
const model = require('../model');

const CONN_STR = 'mongodb://' + config.db_username + ':' + config.db_password + '@' + config.db_host + ':' + config.db_port + '/' + config.db_name;

describe('DB', function () {
	it('Save a CurrencyRate record to mongodb', function (done) {
		let curr = new model.CurrencyRate('CNY', 'HKD', new Date(), '1.14');
		db.saveDocument(CONN_STR, curr).then(function () {
			assert(true);
			done();
		}).catch(function (error) {
			assert(!error);
			done();
		});
	});
});
