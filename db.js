'use strict';

const Config = require('./cfg').config;
const MongoClient = require('mongodb').MongoClient;

let connStr = 'mongodb://' + Config.db_username + ':' + Config.db_password + '@' + Config.db_host + ':' + Config.db_port + '/' + Config.db_name;

MongoClient.connect(connStr, function (err, db) {
	if (err) {
		console.log(err);
		return;
	}

	db.collection('currency').insertOne({
		from: 'USD',
		to: 'HKD',
		created_at: new Date(),
		rate: '7.75'
	}, function (error, result) {
		if (error) {
			console.log(error);
		} else {
			console.log(result);
		}
		db.close();
	});
});
