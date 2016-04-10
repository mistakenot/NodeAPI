module.exports = (models) => {
  var userService = require('./user-service')(models.user, models.password);

  return {
    users: userService
  }
}
 
