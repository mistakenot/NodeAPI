var passport = require('passport')

module.exports.withAuthentication = action => {
  return [
    passport.authenticate('bearer', { session: false }),
    action
  ]
}

module.exports.onPromise = function(getPromise) {
  return function(req, res) {
    getPromise(req).then(
      function(ok) {
        res.json(ok);
      },
      function(err) {
        log.error('Internal error: %s', err);
  			res.json({
  				error: 'Server error: ' + err.message
  			});
      }
    ).catch(err => {
      log.error('Internal error: %s', err);
      res.json({
        error: 'Server error: ' + err.message
      });
    })
  };
}
