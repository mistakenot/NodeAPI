var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
//var UserModel = require(process.cwd() + '/libs/model/user');
var faker = require('faker');

describe('user model', () => {
  var User;
  var username = faker.internet.email();
  var password = faker.internet.password();

  beforeAll(done => {
    mockgoose(mongoose).then(() => {
      mongoose.connect('mongodb://test.com/testdb', (err) => {
        User = require(process.cwd() + '/libs/model/user')(mongoose);
        done(err);
      });
    });
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  it('can be created', done => {
    var user = new User({
      username: username
    });

    user.set('password', password);

    user.save((error, user, affected) => {

      if (affected != 1) {
        throw new Error('Operation returned rows affected: ' + affected);
      }

      done(user);
    });
  });

  it('can be retrieved by username',done => {
    User.findOne({username: username}).exec().then(u => {
      expect(u.username).toEqual(username);
      done();
    })
  })

})
