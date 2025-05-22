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
var connection = require('../modules/dbconnection');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''
    }
});

//..............................................index.................................................................

router.get('/', function(req, res, next) {
  if(!req.isAuthenticated()) {
      res.redirect('/setup/signin');
   } else {
    //  console.log(req.isAuthenticated());
      var user = req.user;
      if(user !== undefined) {
         user = user.toJSON();
      }
        var articles = {};
        var projects = {};
 
         async.parallel([
          function getArticles(callback) {
              connection.query('SELECT * FROM scms_articles LIMIT 0,5',
              function(err, results, fields) {        
              if (err) throw err;
                  articles = results;    
                  callback();
         
              });
          },
           function getProjects(callback) {
              connection.query('SELECT * FROM scms_projects LIMIT 0,5',
              function(err, results, fields) {        
              if (err) throw err;
                  projects = results;    
                  callback();     
              });
          },
        ], 
        function(err) { 
          if (err) return next(err); 

              res.render('setup/index', {
              articles : articles,
              projects : projects,
              title : 'SCms Dashboard',
              user : user ,
              });
        });
   }   
});

//..............................................articles.................................................................

router.get('/articles', function(req, res, next) {

    connection.query('SELECT * FROM scms_articles',
    function(err, results, fields) {
        
        if (err) throw err;        
        res.render('setup/articles', {
          results: results,
          fields: fields,
          title: 'SCms Articles',
        });
   
    });
         
});
//..............................................delete art post.................................................................

router.post('/deleteart/:id', function(req, res, next) {
  var id = req.params.id;
  var filename = '';

  async.series([
    function (callback) {
        connection.query("SELECT * FROM scms_articles WHERE art_id = ?", [id], function(err, rows) {
              filename = rows[0].art_imgurl; 
              console.log(filename);
              callback();     
        });
    },
    function (callback) {

        if (filename != 'default.png') {
          fs.unlink('public/img/uploaded/' + filename, function(err) {
            console.log("deleting img");
            callback();
          });  
        }else{
          callback(console.log('img is default'));
        }
    },
    function (callback) {
        connection.query("DELETE FROM scms_articles WHERE art_id = ?", [id], function(err, rows) {
          console.log("deleting data");
               callback();     
        });
    }

    ], 
  function(err) { 
    if (err) return next(err); 
    //If an error occured, we let express/connect handle it by calling the "next" function
    console.log('redirecting ....');          
    res.redirect('/setup/articles');   
  });

     
});

//..............................................add art get.................................................................

router.get('/addarticle', function(req, res, next) {
  var sections = {};
  var subsections = {};
  async.parallel([
    function (callback) {
        connection.query('SELECT * FROM scms_section',
        function(err, results, fields) {        
        if (err) throw err;
            sections = results;    
            callback();
   
    });
    },
     function (callback) {
        connection.query('SELECT * FROM scms_sub_section WHERE subsc_sc_id = 1',
        function(err, results, fields) {        
        if (err) throw err;
            subsections = results;    
            callback();     
        });
    },
], 
  function(err) { 
    if (err) return next(err); 

        res.render('setup/addarticle', {
        sections: sections,
        subsections: subsections,
        title: 'Add Articles',
        });
  });
         
});

//..............................................helper async.................................................................

router.post('/subschelper',function(req,res,next){
        
    var id = req.body.scid;
    connection.query('SELECT * FROM scms_sub_section WHERE subsc_sc_id = ' + id,
    function(err, results, fields) {        
        if (err) throw err;        
        res.render('components/subscoption', {
        results: results,
        fields: fields,         
      });
    
    });
    
});

//..............................................edit art get.................................................................

router.get('/editarticle/:id', function(req, res, next) {

  var id = req.params.id;
  var sections = {};
  var subsections = {};
  var article = {};

  var sql = 'SELECT scms_articles.*,scms_users.username,scms_users.userId ' + 
  'FROM scms_articles '+                
  'INNER JOIN scms_users ON scms_articles.art_user_id=scms_users.userId '+
  'WHERE scms_articles.art_id = ? '+
  'ORDER BY scms_articles.art_id DESC';

  async.series([

     function loadArt(callback) {
        connection.query(sql,[id],function(err, results, fields) {        
        if (err) throw err;
            article = results;

            callback(console.log(article[0].art_name));
   
      });
    },

    function loadSc(callback) {
        connection.query('SELECT * FROM scms_section ORDER BY FIELD(sc_id, ?) DESC',[article[0].art_sc_id],
        function(err, results, fields) {        
        if (err) throw err;
            sections = results;    
            callback();
   
    });
    },
     function loadSubsc(callback) {
        connection.query('SELECT * FROM scms_sub_section WHERE subsc_sc_id = ? ORDER BY FIELD(subsc_id, ?) DESC',[article[0].art_sc_id,article[0].art_subsc_id],
        function(err, results, fields) {        
        if (err) throw err;
            subsections = results;    
            callback();     
        });
    },
], 
  function(err) { 
    if (err) return next(err); 

        res.render('setup/editarticle', {
        sections: sections,
        subsections: subsections,
        article: article,
        title: 'Edit Articles',
        });
  });
         
});

//...........................................................update article post...................................................

router.post('/updatearticle',function(req,res,next){
  
  var scurl = '';
  var subscurl = '';
  var succes = true;
  var resize = true;
  var name = '';
  var newimg = true;

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/uploaded');
    },
    filename: function (req, file, cb) {
        var date =  Date.now()        
        cb(null, date + file.originalname.replace(/ /g, '-').toLowerCase());
        name = date + file.originalname.replace(/ /g, '-').toLowerCase() ;
        console.log(name + ' upload is starting');
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        } 
        else {
          console.log('invalid - format');
          succes = false;
        }   
    }
  });

  var upload = multer({ storage: storage });// var cpUpload = upload.single('userPhoto');
  var uploadAndUpdate = upload.fields([{ name: 'art_imgurl', maxCount: 1 }]);

  uploadAndUpdate(req, res, function (err) {
 
    if (err) {  
      console.log(err);
    }
    else{
      async.series([
      function resizeOrDelete(callback) {
         if(succes == false){
            console.log('file not correct');
            fs.unlink('public/img/uploaded/' + name, function(err) {
            if (err) {
              callback(console.log(err));
            }
            else{
              newimg = false;
              callback(console.log("deleting"));
            }                 
            });         
          }
          else{
            if(name != ''){
              easyimg.info('public/img/uploaded/' + name).then(
                function(file) {
                  if (file.width <= 900) {
                    resize = false;
                    console.log('small width ' + resize);
                  };
                  if (file.height <= 300) {
                    console.log('small height ' + resize);
                    resize = false;
                  };
                  if (resize == true) { 
                    easyimg.resize({src:'public/img/uploaded/' + name, dst:'public/img/uploaded/' + name, width:900, height:300},
                     function(err, stdout, stderr) {                     
                    });
                    callback(console.log('Resizing to 900x300'));   
                  }
                  else{
                    callback(console.log('Resized stop'));
                  }
              }, function (err) {
                  callback(console.log('cant read info'));
              });
            }
            else{
              callback(console.log('not file'));
              newimg = false;
            }
          }
      },
      function loadSectionData(callback) {
        async.parallel([
          function(callback) {
           connection.query("SELECT * FROM scms_section WHERE sc_id = ?", [req.body.art_sc_id], function(err, rows) {
              scurl = rows[0].sc_url;
              callback();

            });
          },
          function loadSubSectionData(callback) {
             connection.query("SELECT * FROM scms_sub_section WHERE subsc_id = ?", [req.body.art_subsc_id], function(err, rows) {
              subscurl = rows[0].subsc_url; 
              callback();

            });
          },
          ], 
          function(err) { 
          if (err) return next(err); 
              callback();
          });    
      },
    ], 
    function(err) { 
        if (err) return next(err); 
          var arturl = JseString.Urlreplace(req.body.art_name)
          var insert = {                
            art_name : req.body.art_name,
            art_sc_url : scurl,
            art_subsc_url : subscurl,
            art_sc_id : req.body.art_sc_id,
            art_subsc_id : req.body.art_subsc_id,
            art_header : req.body.art_header,
            art_string : req.body.art_string,
            art_url : arturl,
            art_title : req.body.art_name,
            art_description : req.body.art_header,
            art_keywords : req.body.art_name,       
            }

            console.log(newimg);
            if (newimg == false || req.body.imgurl == 'default.png') {
              
                    console.log("no image operation");
                   
            }
            else{
                insert.art_imgurl = name;
                fs.unlink('public/img/uploaded/' + req.body.imgurl, function(err) {
                  if (err) {                  
                  }
                  else{
                    newimg = false;
                    console.log("deleting old");
                  }                 
                  });                  
            }
            connection.query('UPDATE scms_articles SET ? WHERE art_id = '+ req.body.art_id, insert,
                function (err, result) {
                if (err) throw err;
                  console.log('process complete updated to database with ID: ' + result.changedRows);                
                  console.log('redirecting ....');          
                  res.redirect('/setup/articles');
            });  


      });
              
    }
  });
});  

//...........................................................save article post...................................................

router.post('/savearticle',function(req,res,next){

//if(!req.isAuthenticated()) {
//      res.end('200');
//}
//else{

  var succes = true;
  var resize = true;
  var name = '';
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/uploaded');
    },
    filename: function (req, file, cb) {
        var date =  Date.now()        
      //  cb(null, file.fieldname.replace(/\W+/g, '-').toLowerCase() + Date.now() + file.originalname);
        cb(null, date + file.originalname.replace(/ /g, '-').toLowerCase());
        //name = file.fieldname.replace(/\W+/g, '-').toLowerCase() + Date.now() + file.originalname ;
        name = date + file.originalname.replace(/ /g, '-').toLowerCase() ;
        console.log(name + ' upload is starting');
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        } 
        else {
          console.log('invalid - format');
          succes = false;
        }   
    }
  });
  var upload = multer({ storage: storage });// var cpUpload = upload.single('userPhoto');
  var uploadAndSave = upload.fields([{ name: 'userPhoto', maxCount: 1 }]);


   uploadAndSave(req, res, function (err) {
 
      if (err) {  
        console.log(err);
      }
      else{
          if(succes == false){
            console.log('file not correct');
            fs.unlink('public/img/uploaded/' + name, function(err) {
              if (err) {
              console.log(err);
              }
              console.log("deleting")
            });         
          }
          else{
              if(name != ''){
                easyimg.info('public/img/uploaded/' + name).then(
                  function(file) {
               //   console.log(file);
                    if (file.width <= 900) {
                      resize = false;
                      console.log('small width ' + resize);
                    };
                    if (file.height <= 300) {
                      console.log('small height ' + resize);
                      resize = false;
                    };
                    if (resize == true) { 
                      //console.log('Resizing to 640x480');
                      easyimg.resize({src:'public/img/uploaded/' + name, dst:'public/img/uploaded/' + name, width:900, height:300}, function(err, stdout, stderr) {
                        if (err) {
                        }else{
                          console.log('Resized to 900x300');
                        }                          
                      });
                    }
                    else{
                      console.log('Resized stop');
                    }
                }, function (err) {
                    console.log(err);
                }); 

              }
              else{
                console.log('Not file uploaded');
              }             
          }

          var user = req.user;
          if(user !== undefined) {
             user = user.toJSON();
          }  
          var userid = 0;     
          var username = 'test';
          var imgname = name;
          var artsc = '';
          var artsubsc = '';
          var arturl = JseString.Urlreplace(req.body.art_name);
          console.log(arturl);
          var myDate = new Date();
          var time = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
      //    var date = myDate.getDate() + "." + myDate.getMonth() + "." + myDate.getFullYear();       
          if(succes == false || name == ''){
            imgname = 'default.png';
          }
          connection.query("SELECT * FROM scms_users WHERE username = ?", [username], function(err, rows) {
            userid = rows[0].userId ; 
                connection.query("SELECT * FROM scms_section WHERE sc_id = ?", [req.body.art_sc_id], function(err, rows) {
                  artsc = rows[0].sc_url;
                     connection.query("SELECT * FROM scms_sub_section WHERE subsc_id = ?", [req.body.art_subsc_id], function(err, rows) {
                        artsubsc = rows[0].subsc_url; 
                          var insert = {                
                          art_name : req.body.art_name,
                          art_user_id : userid,
                          art_sc_url : artsc,
                          art_subsc_url : artsubsc,
                          art_imgurl : imgname,
                          art_sc_id : req.body.art_sc_id,
                          art_subsc_id : req.body.art_subsc_id,
                          art_header : req.body.art_header,
                          art_string : req.body.art_string,
                          art_time : time,
                          art_url : arturl,
                          art_title : req.body.art_name,
                          art_description : req.body.art_header,
                          art_keywords : req.body.art_name,
                          art_views : 0,
                          art_com_count : 0,
                          art_approved : 1,
                          art_private : true,
                          }
                          connection.query('INSERT INTO scms_articles SET ?', insert,
                              function (err, result) {
                              if (err) throw err;
                                console.log('process complete added to database with ID: ' + result.insertId);
                                connection.query('UPDATE scms_articles SET art_date = CURDATE() WHERE art_id = ?', [result.insertId]);
                                var mailOptions = {
                                    from: 'Devlog <devlog@devlog.com>', 
                                    to: 'frostxx@tiscali.cz', 
                                    subject: 'Devlog', 
                                    text: 'Hello devlog ✔', 
                                    html: '<b>Hello devlog ✔</b>'
                                };
                               /* transporter.sendMail(mailOptions, function(error, info){
                                    if(error){console.log(error);}
                                    else{console.log('Message sent: ' + info.response);}
                                });*/
                                console.log('redirecting ....');          
                                res.redirect('/setup/articles');
                          });
                  });    
               });   
            }); 
      //    console.log('redirect');          
     //     res.redirect('/setup/addarticle');

        }
    });

//}
    
});

 //.............................................sign get.............................................................

router.get('/signin', function (req, res, next) {

  if(req.isAuthenticated()) res.redirect('/setup');
 // console.log('call');
    res.render('setup/signin', {title: 'Sign In'});
});

//.............................................sign post.................................................................

router.post('/signin',function (req, res, next) {

    passport.authenticate('local', { successRedirect: '/setup',
                          failureRedirect: '/setup/signin'}, function(err, user, info) {
      if(err) {
         return res.render('setup/signin', {title: 'Sign In', errorMessage: err.message});
      } 

      if(!user) {
         return res.render('setup/signin', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('setup/signin', {title: 'Sign In', errorMessage: err.message});
         } else {
            return res.redirect('/setup');
         }
      });
   })(req, res, next);
});

//..............................................sign up get.................................................................

router.get('/signup', function (req, res, next) {
 if(req.isAuthenticated()) {
      res.redirect('/setup');
   } else {
      res.render('setup/signup', {title: 'Sign Up'});
   }
});

//..............................................sign up post.................................................................

router.post('/signup', function (req, res, next) {

   var user = req.body;
   var usernamePromise = null;
   usernamePromise = new Model.User({username: user.username}).fetch();

   return usernamePromise.then(function(model) {
      if(model) {
         res.render('setup/signup', {title: 'signup', errorMessage: 'username already exists'});
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new Model.User({username: user.username, password: hash});
         signUpUser.save().then(function(model) {
            // sign in the newly registered user
         //   signInPost(req, res, next);
            res.redirect('/setup/signin/');
         });    
      }
   });
});

//..............................................sign out get.................................................................

router.get('/signout', function (req, res, next) {
  if(!req.isAuthenticated()) {
     res.redirect('/setup/signin');
   } else {
      req.logout();
      res.redirect('/setup/signin');
  }
});

module.exports = router;
