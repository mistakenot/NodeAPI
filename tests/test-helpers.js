var proxyquire = require('proxyquire');
var libs = process.cwd() + '/libs/';
var loadModule = require('./di').loadModule;

var mocks = {
  'mongoose': require('mongoose-mock')
};

module.exports = {
  proxy: (name) => {
    return proxyquire(libs + name, mocks)
  },
  load: (name) => {
    return loadModule(libs + name + '.js', mocks);
  }
}
