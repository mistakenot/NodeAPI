var mongoose = require('mongoose')
var mockgoose = require('mockgoose');
var log = require('./../log')(module);

module.exports = function(uri, mocked) {
	return new Promise((resolve, reject) => {

		mongoose.connection.on('error', function (err) {
			log.error('Connection error:', err.message);
		});

		mongoose.connection.once('open', function callback () {
			log.info("Connected to %s mocked: %s", uri, mocked);
		});

		if (mocked) {
			mockgoose(mongoose).then(() => {
				mongoose.connect(uri, (err) => {
					if (err) {
						reject(err);
					}
					resolve(mongoose);
				});
			});
		}

		else {
			mongoose.connect(uri, err => {
				if (err) {
					reject(err);
				}
				resolve(mongoose);
			});
		}
	});
}
