var express = require('express');
var app = express();
var db = require('./db');

// ADD THESE TWO LINES
var UserController = require('./user/UserController');
var AuthController = require('./auth/AuthController');
app.use('/users', UserController);
app.use('/api/auth' , AuthController);

module.exports = app;