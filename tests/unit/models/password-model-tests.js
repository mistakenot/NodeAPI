var faker = require('faker');
var db = require('./../../mock-db');
var log = load.log(module);

//var passwordModel = require(process.cwd() + '/libs/models/password-model');

describe('Password model', () => {
  var Password;
  var plaintext = faker.internet.password();
  var userId = 1;

  beforeAll(done => {
    db.connect().then(mongoose => {
      Password = load.model('password')(mongoose);
      done()
    });
  });

  afterAll(db.disconnect);

  it('can create a new, valid password', done => {
    var pword = new Password({
      userId: userId,
      password: plaintext
    });

    expect(pword.password).toEqual(plaintext);
    expect(pword.checkPassword(plaintext)).toEqual(true);
    done();
  });
})
