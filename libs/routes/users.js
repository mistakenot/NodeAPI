var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require('./../log')(module);
var db = require(libs + 'db/mongoose');
var User = require(libs + 'model/user');
var service = require(libs + 'services/user-service');

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

/*
router.post('/', (req, res) => {

  log.debug(req.body.username);

  var user = new User({
    username: req.body.username
  });

  user.set('password', req.body.password);

  user.save(err => {
    if (!err) {
			log.info("New user created with id: %s", user.id);
			return res.json({
				status: 'OK',
				user: user
			});
		} else {
			if(err.name === 'ValidationError') {
				res.statusCode = 400;
				res.json({
					error: 'Validation error'
				});
			} else {
				res.statusCode = 500;
				res.json({
					error: 'Server error'
				});
			}
			log.error('Internal error(%d): %s', res.statusCode, err.message);
		}
  })
})
*/

router.post('/'), (req, res) => {
  service.createWithPassword(req.body).then()
});

module.exports = router;
