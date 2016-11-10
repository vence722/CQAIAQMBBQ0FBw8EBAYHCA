'use strict';

const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;


function SaveDocument(connStr, document) {
	return new Promise(function (resolve, reject) {
		MongoClient.connect(connStr, function (err, db) {
			if (err) {
				reject(err);
			}

			db.collection('currency').insertOne(document, function (error, result) {
				if (error) {
					reject(error);
				}
				db.close();
				resolve(result);
			});
		});
	});
}

exports.SaveDocument = SaveDocument;
