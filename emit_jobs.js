'use strict';

const fivebeans = require('fivebeans');

const host = 'challenge.aftership.net';
const port = 11300;
const tube = 'vence722';

const job = {
	type: 'currency_handler',
	payload: '{\'from\':\'CNY\', \'to\':\'HKD\'}'
};

const client = new fivebeans.client(host, port);
client.on('connect', function () {
	console.log('connected');
	client.use(tube, function (err, tname) {
		console.log('using ' + tname);
		client.put(0, 0, 60, JSON.stringify([tube, job]), function (error, jobid) {
			console.log('queued a string reverse job in tube: ' + jobid);
			client.end();
		});
	});
}).on('error', function (error) {
	console.log(error);
}).on('close', function () {
	console.log('close');
});

client.connect();
