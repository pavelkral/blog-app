var mysql = require('mysql');

var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     password : '',
     database : 'devlog'
});

module.exports = connection;