var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require('./../log')(module);
var db = require(libs + 'db/mongoose')(require('mongoose'));
var User = require(libs + 'models/user-model')(db)
var service = require(libs + 'services/user-service')(User);
var r = require('./routes');

router.get('/info', passport.authenticate('bearer', { session: false }),
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

router.get('/:id', r.onPromise(req => {
    if(req.params.id === '42') {
      return Promise.reject("AHH!");
    } else {
      return Promise.resolve({'msg': 'OK'})
    }
  }) 
);

router.post('/',
  r.onPromise(req => {
    return service.createWithPassword(req.body).then(user => { username: user.username });
  })
)

module.exports = router;
