var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require('./../log')(module);
var r = require('./helpers');

module.exports = (service) => {

  router.get('/me', passport.authenticate('bearer', { session: false }),
      function(req, res) {
          // req.authInfo is set using the `info` argument supplied by
          // `BearerStrategy`.  It is typically used to indicate scope of the token,
          // and used in access control checks.  For illustrative purposes, this
          // example simply returns the scope in the response.
          res.json({
          	user_id: req.user.userId,
          	name: req.user.username,
          	scope: req.authInfo.scope
          });
      }
  );

  router.post('/',
    r.onPromise(req => {
      return service.createWithPassword(req.body.username, req.body.password)
        .then(u => {
          return { username: u.username };
        });
    })
  )

  return router;
}
