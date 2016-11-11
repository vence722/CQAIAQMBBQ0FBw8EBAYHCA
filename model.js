'use strict';

/**
 * CurrencyJob constructor
 *
 * @param {string} from - the currency name that tranfered from
 * @param {string} to - the currency name that tranfered to
 * @param {number} retry_count - the current number of retries when fails to process the job
 * @param {number} success_count - the current number that the job has been successfully processed
 * @constructor
 */
function CurrencyJob(from, to, retry_count, success_count) {
	this.type = 'currency_handler';
	this.payload = {
		'from': from,
		'to': to,
		'retry_count': retry_count,
		'success_count': success_count
	};
}

/**
 * CurrencyRate constructor
 *
 * @param {string} from - the currency name that tranfered from
 * @param {string} to - the currency name that tranfered to
 * @param {object} created_at - the Date object of the object creation date
 * @param {number} rate - the exchange rate between the 'from' and 'to' currencies
 * @constructor
 */
function CurrencyRate(from, to, created_at, rate) {
	this.from = from;
	this.to = to;
	this.created_at = created_at;
	this.rate = rate;
}

exports.CurrencyJob = CurrencyJob;
exports.CurrencyRate = CurrencyRate;
