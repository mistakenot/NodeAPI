var nconf = require('nconf');

nconf.file({
	file: './tests/config.json'
});

module.exports = nconf;
