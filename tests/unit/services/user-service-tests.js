var faker = require('faker');
var db = require('./../../mock-db');
var log = load.log(module);

describe('User service', () => {
  var username = faker.internet.email();
  var password = faker.internet.password();
  var service, retrievedUser;

  beforeAll(done => {
    db.connect().then(mongoose => {
      var User = load.model('user')(mongoose);
      service = load.service('user')(User);
      done();
    });
  });

  afterAll(db.disconnect);

  it('should create a user', done => {
    service.createWithPassword(username, password).then(done);
  });

  it('should get a user', done => {
    service.getByUsername(username).then(u => {
      expect(u).toBeDefined();
      expect(u.username).toEqual(username);
      retrievedUser = u;
      done();
    });
  });

  it('should have a valid password', () => {
    expect(retrievedUser.checkPassword(password)).toEqual(true);
  });

  it('should reject an invalid password', done => {
    service.createWithPassword(faker.internet.email(), undefined);
  });

});
