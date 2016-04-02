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

  it('should be able to create and retrieve a new user', done => {
    controller.createWithPassword(username, password).then(() => {
      controller.getByUsername(username).then(u => {
        expect(u.username).toEqual(username);
        done();
      });
    });
  });

})
