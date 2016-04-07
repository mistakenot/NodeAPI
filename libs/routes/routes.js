var passport = require('passport')

module.exports.withAuthentication = action => {
  return [
    passport.authenticate('bearer', { session: false }),
    action
  ]
}

module.exports.onPromise = (getPromise) => {
  return (req, res) => {
    getPromise(req).then(
      (ok) => {
        res.json(ok);
      },
      (err) => {
        res.responseCode = 500;
  			res.json({
  				error: err
  			});
      }
    );
  }
};
