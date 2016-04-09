var faker = require('faker');
var request = require('./../client');

var ok = (code, next) => {
  return (error, response, body) => {
    console.log(body);
    expect(error).toEqual(null);
    expect(response.statusCode).toEqual(code);
    next(body);
  }
}

describe('User API', () => {
  describe('POST', () => {
    var user = {
      username: faker.internet.email(),
      password: faker.internet.password()
    };

    it('creates a new user', done => {
      request.post({url: '/users/', body: JSON.stringify(user)}, ok(200, body => { done(body); }))
    });

  });

  describe('GET', () => {

    it('retrieves an existing user', done => {
      done();
    });
  })
});
