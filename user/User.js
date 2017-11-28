var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	name : { type : String, required : true, minlength : 1, trim : true },
	email : { type : String, required : true, minlength : 1, trim : true, unique : true },
	password : { type : String, required : true, minlength : 6} 
});

mongoose.model('User',UserSchema);

module.exports = mongoose.model('User');