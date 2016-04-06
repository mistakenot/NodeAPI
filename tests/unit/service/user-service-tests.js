var helpers = require('./../../test-helpers');
var faker = require('faker');
var libs = process.cwd() + '/libs/';
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('User service', () => {
  var username = faker.internet.email();
  var password = faker.internet.password();
  var service;

  beforeAll(done => {
    mockgoose(mongoose).then(() => {
      mongoose.connect('mongodb://test.com/testdb', (err) => {
        var User = require(libs + 'model/user')(mongoose);
        var service = require(libs + 'services/user-service');
        done(err);
      });
    });
  });

  afterAll(() => {
    mongoose.disconnect();
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
