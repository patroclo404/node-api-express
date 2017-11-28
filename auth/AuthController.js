// AuthController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var _ = require('lodash');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

var  VerifyToken  = require('./VerifyToken');


router.post('/register'  ,function(req, res) {
  
  if( req.body.password === undefined || req.body.password.length < 6 )
    return res.status(400).send({message : 'Password is required or is lower than 6'});

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },function (error, user) {
    if (error) return res.status(500).send({ message : error.message, error });
	    else{
		    // create a token
		    var token = jwt.sign({ id: user._id }, config.secret, {
		      expiresIn: 86400 // expires in 24 hours
		    });
		    res.status(201).send({ auth: true, token: token });
	    }
  }); 
});


router.get('/me', VerifyToken , function(req, res, next) {
  User.findById( req.userId, { password : 0 }, (error, user)=>{
    if( error ) return res.status(500).send({message : "There was a problem finding the user"});
    if( !user ) return res.status(404).send({ message : "Not found" });
    res.send(user);

  });
});


router.post('/login',(req , res)=>{
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email : email }, (error, user)=>{
    if( error) return res.status(500).send({message : "There was a problem finding the user"}, error);
    if( !user ) return res.status(404).send({message : "User not found", error});
    var isValidPassword = bcrypt.compareSync( password , user.password );

    if( !isValidPassword ) return res.status(401).send( {message:"Invalid password",error} );

    var token = jwt.sign({ id: user.id }, config.secret, { expiresIn : 86400 } );

    res.send({ auth : true, token : token });

  });

});


module.exports = router;