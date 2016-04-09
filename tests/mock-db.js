var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

module.exports.connect = function () {
  return new Promise((resolve, reject) => {
    mockgoose(mongoose).then(() => {
      mongoose.connect('mongodb://test.com/testdb', (err) => {
        if (err) {
          reject(err);
        }
        resolve(mongoose);
      });
    });
  });
};

module.exports.disconnect = function (done) {
  mockgoose.reset(() => done());
  mongoose.disconnect();
}
