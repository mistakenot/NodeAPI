var nconf = require('nconf').env();
var path = process.cwd() + '/config/';
var log = require(process.cwd() + '/libs/log')(module);
var used = [];

var using = (config) => {
  log.debug('Using: ' + config);
  nconf.file(config, process.cwd() + '/config/' + config + '.json');
};

var hasArg = (val) => {
  return process.argv.indexOf(val) != -1
};

// MongoDB
if (hasArg('--mock')) {
  using('mongo.mock');
}
using('mongo.local');

// Testing
if (hasArg('test')) {
  using('testing');
}

// Oauth
using('clients');

// General
using('config');
using('net.local');
using('secrets');
using('braintree.sandbox');

if (hasArg('--config')) {
  console.log(nconf.get());
}

module.exports = nconf;
