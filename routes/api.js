var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jsonParser = bodyParser.json();
var path = require('path');
var fs = require('fs');
var Model = require('../modules/model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var secret = 'this is the secret secret secret 12356';

var connection = require('../modules/dbconnection');

var jwtCheck =  expressJwt({secret: secret,
getToken: function fromHeaderOrQuerystring (req) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1];
	} else if (req.query && req.query.token) {
		return req.query.token;
	}
	return null;
}
});

router.get('/', function(req, res) {
	//  res.sendFile(path.resolve(__dirname, '../public/index.html'));
		res.render('pages/api');
});

router.post('/login', function (req, res) {
	//if is invalid, return 401

	new Model.User({username: req.body.email}).fetch().then(function(data) {
		var user = data;
		if(user === null) {
			res.status(401).send('Wrong user or password');
			return;
			//return {message: 'Invalid username or password'};
		} else {
			user = data.toJSON();
			if(!bcrypt.compareSync(req.body.password, user.password)) {
				res.status(401).send('Wrong user or password');
				return;
			} else {

				var profile = {
					first_name: user.user_name,
					last_name: user.user_lastname,
					email: user.username,
					id: user.userId
				};
				// We are sending the profile inside the token
				var token = jwt.sign(profile, secret, { expiresIn: 60*60 });
				res.json({ access_token: token ,name: user.username});
				//return user;
			}
		}
	});


});


router.get('/me', jwtCheck,function (req, res) {
	console.log('user ' + req.user.email + ' is calling /api/restricted');
	res.json({
		name: req.user.email
	});
});



router.get('/articles',jwtCheck, function(req, res) {

	connection.query('SELECT * FROM scms_articles', function(err, rows, fields)
   {  
        console.log('Connection result error '+err);
        console.log('no of records is '+rows.length);
        res.writeHead(200, { 'Content-Type': 'application/json'});            
        res.end(JSON.stringify(rows));
    });
	
});



module.exports = router;
