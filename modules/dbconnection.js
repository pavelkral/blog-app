var mysql = require('mysql');

var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     password : '',
     database : ''
});

module.exports = connection;