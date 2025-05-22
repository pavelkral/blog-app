var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jsonParser = bodyParser.json();
var path = require('path');
var fs = require('fs');

var connection = require('../modules/dbconnection');


router.get('/', function(req, res) {
	//  res.sendFile(path.resolve(__dirname, '../public/index.html'));
		res.render('pages/react');
});

router.get('/comments', function(req, res) {
	
		fs.readFile('public/data/comments.json', function(err, data) {
			res.setHeader('Cache-Control', 'no-cache');
			res.setHeader('Access-Control-Allow-Origin','*');
			res.json(JSON.parse(data));
		});
});

router.post('/savecomment',jsonParser, function(req, res) {
		
		fs.readFile('public/data/comments.json', function(err, data) {
		var comments = JSON.parse(data);

		comments.push(req.body);
		console.log(req.body);

			fs.writeFile('public/data/comments.json', JSON.stringify(comments, null, 4), function(err) {
				res.setHeader('Cache-Control', 'no-cache');
				res.setHeader('Access-Control-Allow-Origin','*');
				res.json(comments);
				
			});
		});
});

router.get('/api/articles',jsonParser, function(req, res) {

	connection.query('SELECT * FROM scms_articles', function(err, rows, fields)
   {  
        console.log('Connection result error '+err);
        console.log('no of records is '+rows.length);
        res.writeHead(200, { 'Content-Type': 'application/json'});            
        res.end(JSON.stringify(rows));
    });
	
});

module.exports = router;
