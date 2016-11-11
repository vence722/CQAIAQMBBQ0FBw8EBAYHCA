'use strict';

const fivebeans = require('fivebeans');
const argv = require('yargs')
    .usage('Usage: node currency_worker.js --id=[ID] --config=[config.yml]')
    .default('id', 'defaultID')
    .demand(['config'])
    .argv;

/**
* Runs the beanstalkd runner based on the commandline arguments
* Requires the Job ID and the config file path
*/
(function () {
	let runner = new fivebeans.runner(argv.id, argv.config);
	runner.go();
}());
