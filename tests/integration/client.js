var request = require('request');
var config = require('./../config');

var baseUrl = 'http://' +  config.get('host') + ':' + config.get('port') + '/';

var r = request.defaults({
  baseUrl : baseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1500
});

module.exports = r;
