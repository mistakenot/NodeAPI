var helpers = require('./../../test-helpers');
var faker = require('faker');
var libs = process.cwd() + '/libs/';
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('User service', () => {
  var username = faker.internet.email();
  var password = faker.internet.password();
  var service;
  var retrievedUser;

  beforeAll(done => {
    mockgoose(mongoose).then(() => {
      mongoose.connect('mongodb://test.com/testdb', (err) => {
        var User = require(libs + 'model/user')(mongoose);
        service = require(libs + 'services/user-service')(User);
        done();
      });
    });
  });

  afterAll(done => {
    mongoose.disconnect();
    mockgoose.reset(() => done());
  })

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

})
