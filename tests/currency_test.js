'use strict';

const assert = require('chai').assert;
const currency = require('../currency');

describe('Currency', function () {
	it('currency.getCurrency(\'USD\', \'HKD\'), should returns a CurrencyRate object', function (done) {
		currency.getCurrency('USD', 'HKD').then(function (curr) {
			assert(curr.rate > 0);
			done();
		}, function (error) {
			assert.fail(error);
			done();
		});
	});
	it('currency.getCurrency(\'AAA\', \'\'), invalid currency name inputed, should return a CurrencyRate object with NaN rate', function (done) {
		currency.getCurrency('AAA', '').then(function (curr) {
			assert(isNaN(curr.rate));
			done();
		}, function (error) {
			assert.fail(error);
			done();
		});
	});
});
