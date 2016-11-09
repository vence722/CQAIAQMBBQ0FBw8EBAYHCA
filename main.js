'use strict';

const co = require('co');
const currency = require('./currency');

const from = 'USD';
const to = 'HKD';

co(function* () {
	for (let i = 0; i < 10; i++) {
		let curr = yield currency.GetCurrency(from, to);
		console.log(curr);
	}
});
