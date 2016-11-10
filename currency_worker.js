'use strict';

const argv = require('yargs')
    .usage('Usage: node currency_worker.js --id=[ID] --config=[config.yml]')
    .default('id', 'defaultID')
    .demand(['config'])
    .argv;

const fivebeans = require('fivebeans');

let runner = new fivebeans.runner(argv.id, argv.config);
runner.go();
