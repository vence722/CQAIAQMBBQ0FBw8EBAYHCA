'use strict';

const bsd = require('beanstalkd');

const beanstalkd = new bsd.BeanstalkdClient('challenge.aftership.net', 9578);

beanstalkd.connect().then(function (beanstalkd) {

  console.log('connected');
  
  // Close when done 
  beanstalkd.quit();
});

