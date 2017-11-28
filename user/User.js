var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	name : 
	{ 
		type : String, 
		required : '{PATH} is required!', 
		minlength : 5, 
		trim : true 
	},
	email : 
	{ 
		type : String, 
		required : '{PATH} is required!', 
		minlength : 1, 
		trim : true, 
		unique : '{PATH} duplicated'
	},
	password : 
	{ 
		type : String, 
		required : '{PATH} is required!', 
		minlength : 6,
	} 
});

mongoose.model('User',UserSchema);

module.exports = mongoose.model('User');