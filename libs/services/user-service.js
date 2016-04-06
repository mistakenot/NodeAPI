var libs = process.cwd() + '/libs/';
var log = require('./../log')(module);
var _ = require('lodash');

module.exports = function(User) {
  return {
    createWithPassword(username, password) {
      return new Promise((resolve, reject) => {
        User.findOne({
          username: username
        }, (err, existingUser) => {
          if (err) {
            throw err;
          }

          if (existingUser) {
            throw new Error('User already exists: ' + username);
          }

          var user = new User({
            username: username
          });

          user.set('password', password);

          user.save((error, user, affected) => {
            if (error) {
              throw error
            }

            if (affected != 1) {
              throw new Error('Operation returned rows affected: ' + affected);
            }

            resolve(user);
          });
        })
      });
    },

    getByUsername(username) {
      return User.findOne({username: username}).exec();
    }
  }

}
