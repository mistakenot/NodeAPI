var crypto = require('crypto');
var log = require('./../log')(module);

module.exports = (mongoose) => {
  var	Schema = mongoose.Schema;
  var Password = new Schema({
      userId: {
        type: String,
        required: true
      },
			hashedPassword: {
				type: String,
				required: true
			},
			salt: {
				type: String,
				required: true
			},
			created: {
				type: Date,
				default: Date.now
			}
		});

	Password.methods.encryptPassword = function(password) {
		return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	};

	Password.virtual('password')
		.set(function(password) {
			if(password === undefined) {
				throw new Error("Password is undefined.");
			}
			this._plainPassword = password;
			this.salt = crypto.randomBytes(32).toString('hex');
	    this.hashedPassword = this.encryptPassword(password);
	  })
		.get(function() { return this._plainPassword; });


	Password.methods.checkPassword = function(password) {
		return this.encryptPassword(password) === this.hashedPassword;
	};

	return mongoose.model('Password', Password);
}
