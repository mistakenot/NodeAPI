var libs = process.cwd() + '/libs/';
var log = require('./../log')(module);
var _ = require('lodash');

module.exports = function(User) {
  var projection = 'username _id';

  return {
    createWithPassword(username, password) {
      return new Promise((resolve, reject) => {
        User.findOne({ username: username }, projection, (err, existingUser) => {

          if (err != null) {
            return reject(err);
          }

          if (existingUser) {
            return reject('User already exists');
          }

          if (password === undefined) {
            return reject("Password is undefined.");
          }

          var user = new User({
            username: username,
            password: password
          });

          user.save((error, user, affected) => {
            if (error) {
              reject(error);
            }

            if (affected != 1) {
              reject('Operation returned rows affected: ' + affected);
            }

            resolve(user);
          });
        })
      });
    },

    getByUsername(username) {
      return User.findOne({ username: username }, projection).exec();
    },

    getById(id, privateFields) {
      return new Promise((resolve, reject) => {
        User.findById(id, projection, (err, user) => {
          if (err != null) {
            reject(err);
          } else {
            resolve(user);
          }
        })
      })
    }

  }
}
