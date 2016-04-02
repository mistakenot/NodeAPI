var helpers = require('./../../test-helpers');
var faker = require('faker');
var libs = process.cwd() + '/libs/';
var db = require(libs + 'db/mongoose');

describe('User controller', () => {
  var username = faker.internet.email();
  var password = faker.internet.password();
  var controller;

  beforeEach(() => {
    controller = helpers.proxy('controllers/user-controller')(er => {
      throw er;
    });
  });

  it('should be able to create a new user', done => {
    controller.createWithPassword(username, password).then(done);
  });

  it('should be able to find an existing user', done => {
    controller.getByUsername(username).then(u => {
      expect(u.username).toEqual(username);
      done();
    });
  });
})
