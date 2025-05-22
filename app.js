var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var http = require('http');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var clientroutes = require('./routes/client');
var reactroutes = require('./routes/react');
var setuproutes = require('./routes/setup');
var apiroutes = require('./routes/api');
var iosrv = require('./modules/io');
var projectsroutes = require('./routes/projects');
var cors = require('cors');

var Model = require('./modules/model');

var app = express();

passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});
app.use(cors());
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());
app.set('port', process.env.PORT || 3000);
app.use('/', clientroutes);
app.use('/react', reactroutes);
app.use('/setup', setuproutes);
app.use('/api', apiroutes);
app.use('/setup/projects', projectsroutes);


app.use(function(req, res) {
     res.send('404: Page not Found', 404);
});
  
app.use(function(error, req, res, next) {
     res.send('500: Internal Server Error', 500);
      console.log(error);
});
app.use(function(err, req, res, next){
   if (err.constructor.name === 'UnauthorizedError') {
      res.status(401).send('Unauthorized');
   }
});



var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;
   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});

var io = require('socket.io')(server);
io.set( 'origins', '*:*' );
//http.createServer(app).listen(3000, function(){
//  console.log("Express server listening on port 3000");
//});
var chat = new iosrv(io, 100);
chat.start();