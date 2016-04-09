module.exports = (services) => {
  var users = require('./user-routes')(services.users)

  return {
    users: users
  };
}
