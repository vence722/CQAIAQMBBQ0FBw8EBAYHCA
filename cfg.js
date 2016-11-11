'use strict';

const CONFIG = {
	'db_host': 'ds147797.mlab.com',
	'db_port': 47797,
	'db_username': 'vence',
	'db_password': '123',
	'db_name': 'currency',
	'db_collection': 'currency',

	'beanstalkd_host': 'challenge.aftership.net',
	'beanstalkd_port': 11300,
	'beanstalkd_tube': 'vence722',

	'job_run_count_limit': 10,
	'job_retry_count_limit': 3,
	'job_next_delay': 60,
	'job_retry_delay': 3
};

exports.config = CONFIG;
