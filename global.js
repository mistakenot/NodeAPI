GLOBAL._ = require('lodash');

var libs = process.cwd() + '/libs/';

GLOBAL.load = {
  service: (name) => require(libs + 'services/' + name + '-service'),
  model: (name) => require(libs + 'models/' + name + '-model'),
  log: require('./libs/log')
}
