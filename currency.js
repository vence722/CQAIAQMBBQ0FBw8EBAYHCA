'use strict';

const Promise = require('bluebird');
const util = require('./util');

function GetCurrency(from, to) {
    return new Promise(function (resolve, reject) {
        util.GetContent('http://download.finance.yahoo.com/d/quotes.csv?e=.csv&f=sl1d1t1&s=' + from + to + '=X')
            .then(function(content){
            var rate = util.Round(content.split(',')[1], 2).toString();
            var currency = new Currency(from, to, new Date(), rate);
            resolve(currency);
        }).catch(function(error){
            reject(error);
        });
    });
}

function Currency(from, to, created_at, rate) {
    this.from = from;
    this.to = to;
    this.created_at = created_at;
    this.rate = rate;
}

exports.GetCurrency = GetCurrency;
exports.Currency = Currency;
