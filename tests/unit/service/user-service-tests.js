var helpers = require('./../../test-helpers');
var faker = require('faker');
var libs = process.cwd() + '/libs/';

var controller = require(libs + 'services/user-service')

describe('User service', () => {
  var username = faker.internet.email();
  var password = faker.internet.password();
  var db;

  beforeEach(() => {
    db = require(libs + 'db/mongoose');
  });

  afterEach(() => {
    db.disconnect();
  })

  it('should be able to create and retrieve a new user', () => {
    var retrievedUser;

    it('should create a user', done => {
      controller.createWithPassword(username, password).then(done);
    });

    it('should get a user', done => {
      controller.getByUsername(username).then(u => {
        expect(u.username).toEqual(username);
        retrievedUser = u;
        done();
      });
    });

    it('should have a valid password', () => {
      expect(u.checkPassword(password)).toEqual(true);
    });
  });

})
