var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');

var middleware = require('./middleware');

var libs = process.cwd() + '/libs/';
// require(libs + 'auth/auth');

var config = require('./../config/config');
var log = require('./log')(module);
//var oauth2 = require('./auth/oauth2');

//var api = require('./routes/api');
var loadDb = require('./db/mongoose')(
  config.get('mongoose:uri'),
  config.get('mongoose:mockgoose')
);

var getApp = (db) => {
  var app = middleware(express());
  var services = require(libs + 'services/services')(db);
  var routes = require(libs + 'routes/routes')(services);

  // app routes
  app.use('/api/users', routes.users);
  //app.use('/api', api);
  //app.use('/api/articles', articles);
  //app.use('/api/oauth/token', oauth2.token);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
      res.status(404);
      log.debug('%s %d %s', req.method, res.statusCode, req.url);
      res.json({
      	error: 'Not found'
      });
      return;
  });

  // error handlers
  app.use((err, req, res, next) => {
      res.status(err.status || 500);
      log.error('%s %d %s', req.method, res.statusCode, err.message);
      res.json({
        error: err.message,
        stack: err.stack,
        args: err.arguments
      });
      return;
  });

  return app;
}

var result = loadDb
  .then(db => {
    return getApp(db);
  });

module.exports = result;
