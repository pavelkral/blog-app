var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jsonParser = bodyParser.json();
var path = require('path');
var fs = require('fs');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('../modules/model');
var multer = require('multer');
var easyimg = require('easyimage');
var JseString = require('../modules/jsestring');
var nodemailer = require("nodemailer");
var async = require('async');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''
    }
});

var connection = require('../modules/dbconnection');

//..............................................index.................................................................

router.get('/', function(req, res) {
	if(!req.isAuthenticated()) {
		res.redirect('/setup/signin');
	} else {

    var user = req.user;
    if(user !== undefined) {
       user = user.toJSON();
    }

    var projects = {};

    connection.query('SELECT * FROM scms_projects',
      function(err, results, fields) {
          
          if (err) throw err;
          projects = results;         
          res.render('setup/projects', {
              title : 'SCms Projects',
              projects : projects,
              user : user ,
          });
     
      });
		  
	}
});

router.get('/add', function(req, res) {
   res.render('setup/projects');
});

module.exports = router;
