'use strict';

const co = require('co');
const emitter = require('./job_emitter');
const model = require('./model');
const argv = require('yargs')
    .usage('Usage: node currency_emit_job.js --from=[from currency] --to=[to currency]')
    .demand('from')
    .demand('to')
    .argv;

// Emit a job based on the command line parameters
(function () {
	let job = new model.CurrencyJob(argv.from, argv.to, 0, 0);
	co(function* () {
		yield emitter.emitJob(job).catch(function (err) {
			console.log('Job emit failed: ' + err);
		});
	});
}());
