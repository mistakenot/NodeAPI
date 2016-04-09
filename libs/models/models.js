module.exports = (db) => {
  var userModel = require('./user-model')(db);

  return {
    user: userModel
  };
}
