var nconf = require('nconf').env();
var path = process.cwd() + '/config/';

var using = (config) => {
  nconf.file(config, process.cwd() + '/config/' + config + '.json');
};

var hasArg = (val) => {
  return process.argv.indexOf(val) != -1
};

// MongoDB
//using('mongo.local');
if (hasArg('mock')) {
  using('mongo.mock');
}

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

nconf.loadFilesSync([path + 'config.json']);

module.exports = nconf;
