'use strict';

const assert = require('chai').assert;
const model = require('../model');
const emitter = require('../job_emitter');

describe('JobEmiiter', function () {
	it('emit a CurrencyJob to beanstalkd server', function (done) {
		let job = new model.CurrencyJob('JPY', 'HKD', 0, 0);
		emitter.emitJob(job).then(function () {
			assert(true);
			done();
		}).catch(function (err) {
			assert.fail(err);
			done();
		});
	});
});
