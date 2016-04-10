module.exports = (db) => {
  var userModel = require('./user-model')(db);
  var passwordModel = require('./password-model')(db);

  return {
    user: userModel,
    password: passwordModel
  };
}
