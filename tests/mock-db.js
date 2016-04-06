var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

module.exports.connect = function () {
  return new Promise((resolve) => {
    mockgoose(mongoose).then(() => {
      mongoose.connect('mongodb://test.com/testdb', (err) => {
        if (err) {
          throw err;
        }
        resolve(mongoose);
      });
    });
  });
};

module.exports.disconnect = function (done) {
  mongoose.disconnect();
  mockgoose.reset(() => done());
}
