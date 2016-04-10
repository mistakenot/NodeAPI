var config = require(process.cwd() + '/config/config');

describe('Config file', () => {
  it('parses correctly', () => {
    var c = config.get();
    expect(c.port).toEqual(1337);
  })
})
