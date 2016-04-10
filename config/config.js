var nconf = require('nconf').env();

var using = (config) => {
  nconf.file({
    file: './' + config + '.json'
  })
};

if (process.args.contains('mock')) {
  using('mongo.mock');
}

if (process.args.contains('testing')) {
  using('testing');
}

using('config');
using('mongo.local');
using('net.local');
using('clients');

nconf.file({ file: process.cwd() + '/config.json'});

module.exports = nconf;
