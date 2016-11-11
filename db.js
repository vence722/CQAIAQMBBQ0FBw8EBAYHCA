'use strict';

const Bluebird = require('bluebird');
const MongoClient = require('mongodb').MongoClient;

/**
* the function to save a JSON document to MongoDB
*
* @param {string} connStr - the connection string for a mongodb data source
* @param {object} document - the data to be saved to mongodb
* @function
*/
function saveDocument(connStr, document) {
	return new Bluebird(function (resolve, reject) {
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

exports.saveDocument = saveDocument;
