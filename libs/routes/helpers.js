var passport = require('passport')
var log = require('./../log')(module);

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
        res.statusCode = 200;
        res.json(ok);
      },
      (err) => {
        res.statusCode = 500;
        res.json({
          error: err
        });
      }
    )
    .catch(err => {
      log.error(err);
      res.statusCode = 500;
      res.json({
        error: err
      });
    });
  }
};
