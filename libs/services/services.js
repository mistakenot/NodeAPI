module.exports = (db) => {
  var userModel = require('./../models/user-model')(db)
  var userService = require('./user-service')(userModel);

  return {
    users: userService
  }
}
