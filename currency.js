'use strict';

const Bluebird = require('bluebird');
const util = require('./util');
const model = require('./model');

/**
* Get the latest currency exchange rate from Yahoo Finance data source
*
* @param {string} from - the currency name that tranfered from
* @param {string} to - the currency name that tranfered to
* @function getCurrency
*/
function getCurrency(from, to) {
	return new Bluebird(function (resolve, reject) {
		util.getContent('http://download.finance.yahoo.com/d/quotes.csv?e=.csv&f=sl1d1t1&s=' + from + to + '=X')
			.then(function (content) {
				let rate = util.round(content.split(',')[1], 2);
				let curRate = new model.CurrencyRate(from, to, new Date().getTime(), rate);
				resolve(curRate);
			}).catch(function (error) {
				reject(error);
			});
	});
}

exports.getCurrency = getCurrency;
