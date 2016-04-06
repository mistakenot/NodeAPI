module.exports = function(mongoose) {
	var libs = process.cwd() + '/libs/';
	var log = require(libs + 'log')(module);
	var config = require(libs + 'config');

	mongoose.connect(config.get('mongoose:uri'));

	mongoose.connection.on('error', function (err) {
		log.error('Connection error:', err.message);
	});

	mongoose.connection.once('open', function callback () {
		log.info("Connected to DB!");
	});

	return mongoose;
};
