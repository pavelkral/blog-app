var Bookshelf = require('bookshelf');

var config = {
   host: 'localhost',  // your host
   user: 'root', // your database user
   password: '', // your database password
   database: 'devlog'
};


var DB = Bookshelf.initialize({
   client: 'mysql', 
   connection: config
});

module.exports.DB = DB;