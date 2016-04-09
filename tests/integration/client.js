var request = require('request');
var config = require('./../config');

var baseUrl = 'http://' +  config.get('host') + ':' + config.get('port') + '/api/';

module.exports = request.defaults({
  baseUrl : baseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1500
});
