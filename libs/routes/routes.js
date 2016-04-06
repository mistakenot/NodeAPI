var passport = require('passport')

module.exports.withAuthentication = action => {
  return [
    passport.authenticate('bearer', { session: false }),
    action
  ]
}
