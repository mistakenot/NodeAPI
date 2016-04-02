var libs = process.cwd() + '/libs/';
var mongoose;

module.exports = function(action) {
  beforeEach(() => {
    mongoose =  = require(libs + 'db/mongoose');
  });

  afterEach(done => {
    mongoose.disconnect();
  });
}
