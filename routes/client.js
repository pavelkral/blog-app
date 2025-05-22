var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jsonParser = bodyParser.json();
var path = require('path');
var fs = require('fs');
var async = require('async');

var connection = require('../modules/dbconnection');
var DbSqlModel = require('../modules/dbsqlmodel');

//...........................................................................................
router.get('/', function(req, res) {


    var subsection = {};
    var data;
    var links;
    var nextlink;
    var prevlink;
    var model;
    var title = 'blog about programing and some of my activities';
    var keywords = 'blog , programing , some activities';
    var description = 'blog about programing and some of my activities';

    str_query = 'SELECT scms_articles.*,scms_users.*,scms_sub_section.*  ' + 
                'FROM scms_articles '+ 
                'INNER JOIN scms_sub_section ON scms_articles.art_subsc_id=scms_sub_section.subsc_id '+               
                'INNER JOIN scms_users ON scms_articles.art_user_id=scms_users.userId '+
                'ORDER BY scms_articles.art_id DESC';
 
    model = new DbSqlModel(req);
    model.setQuery(str_query);
    
    async.series([
             
      function getModel(callback) {
        model.build(function(err,backdata,mdlinks,mdnextln,mdprevln) {        
          if (err) throw err;
            data = backdata;
            links = mdlinks;
            nextlink = mdnextln;
            prevlink = mdprevln;
       //   console.log(data);
            callback();
        });
       
      },
    
      function getSubsection(callback) {
          connection.query('SELECT * FROM scms_sub_section LIMIT 0,10',
          function(err, results, fields) {        
          if (err) throw err;
              subsection = results;    
              callback();     
          });
      },
    ], 
    function(err) { 
      if (err) return next(err);         
          console.log('render');
          res.render('pages/index', {
              articles : data,
              title : title,
              keywords : keywords,
              description : description,
              subsection : subsection,
              arr_links : links,
              str_prevlink : prevlink,
              str_nextlink : nextlink,
          });
    });

   // res.render('pages/outoff');

});
//...........................................................................................
router.get('/section/:scname', function(req, res) {

  var url = req.params.scname;
    var title = '';
    var keywords = '';
    var description = '';

   var subsection = {};
    var data;
    var links;
    var nextlink;
    var prevlink;
    var model;

    str_query = 'SELECT scms_articles.*,scms_users.*,scms_sub_section.*  ' + 
                'FROM scms_articles '+ 
                'INNER JOIN scms_sub_section ON scms_articles.art_subsc_id=scms_sub_section.subsc_id '+               
                'INNER JOIN scms_users ON scms_articles.art_user_id=scms_users.userId '+
                'WHERE scms_sub_section.subsc_url = "' + url + 
                '" ORDER BY scms_articles.art_id DESC';

    console.log(str_query);            
 
    model = new DbSqlModel(req);
    model.setQuery(str_query);
    
    async.series([
             
      function getModel(callback) {
        model.build(function(err,backdata,mdlinks,mdnextln,mdprevln) {        
          if (err) throw err;
          data = backdata;
          links = mdlinks;
          nextlink = mdnextln;
          prevlink = mdprevln;
       //   console.log(data);          
          callback();     
        });
       
      },
    
      function getSubsection(callback) {
          connection.query('SELECT * FROM scms_sub_section LIMIT 0,10',
          function(err, results, fields) {        
          if (err) throw err;
              subsection = results;    
              callback();     
          });
      },
    ], 
    function(err) { 
      if (err) return next(err);         
          console.log('render');
          var subscname = '';
          if(data[0] != null) {
                 subscname = data[0].subsc_name;
        } else {
           
        }
          res.render('pages/section', {
            articles : data,
            subsection : subsection,
            subscname : subscname,
            arr_links : links,
            str_prevlink : prevlink,
            str_nextlink : nextlink,
          });
    });
   // res.render('pages/index');
});
//...........................................................................................
router.get('/search/:string', function(req, res) {

    var string = req.params.string;
    var title = '';
    var keywords = '';
    var description = '';
    var subsection = {};
    var data;
    var links;
    var nextlink;
    var prevlink;
    var model;

    str_query = 'SELECT scms_articles.*,scms_users.*,scms_sub_section.*  ' + 
                'FROM scms_articles '+ 
                'INNER JOIN scms_sub_section ON scms_articles.art_subsc_id=scms_sub_section.subsc_id '+               
                'INNER JOIN scms_users ON scms_articles.art_user_id=scms_users.userId '+
                'WHERE scms_articles.art_name LIKE "%' + string + 
                '%" ORDER BY scms_articles.art_id DESC';

    console.log(str_query);            
 
    model = new DbSqlModel(req);
    model.setQuery(str_query);
    
    async.series([
             
      function getModel(callback) {
        model.build(function(err,backdata,mdlinks,mdnextln,mdprevln) {        
          if (err) throw err;
          data = backdata;
          links = mdlinks;
          nextlink = mdnextln;
          prevlink = mdprevln;
       //   console.log(data);          
          callback();     
        });
       
      },
    
      function getSubsection(callback) {
          connection.query('SELECT * FROM scms_sub_section LIMIT 0,10',
          function(err, results, fields) {        
          if (err) throw err;
              subsection = results;    
              callback();     
          });
      },
    ], 
    function(err) { 
      if (err) return next(err);         
          console.log('render');
          var subscname = 'Search ';
          if(data[0] != null) {
                 subscname += data[0].subsc_name;
        } else {
           
        }
          res.render('pages/search', {
            articles : data,
            subsection : subsection,
            subscname : subscname,
            arr_links : links,
            str_prevlink : prevlink,
            str_nextlink : nextlink,
          });
    });
   // res.render('pages/index');
});
//............................................................................................
router.get('/log/:url', function(req, res) {

    var url = req.params.url;
    var title = '';
    var keywords = '';
    var description = '';
    var subsection = {};
    var data;
    var links;
    var nextlink;
    var prevlink;
    var model;

    str_query = 'SELECT scms_articles.*,scms_users.*,scms_sub_section.*  ' + 
                'FROM scms_articles '+ 
                'INNER JOIN scms_sub_section ON scms_articles.art_subsc_id=scms_sub_section.subsc_id '+               
                'INNER JOIN scms_users ON scms_articles.art_user_id=scms_users.userId '+
                'WHERE scms_articles.art_url = "' + url + 
                '" ORDER BY scms_articles.art_id DESC';

    console.log(str_query);            
 
    model = new DbSqlModel(req);
    model.setQuery(str_query);
    
    async.series([
             
      function getModel(callback) {
        model.build(function(err,backdata,mdlinks,mdnextln,mdprevln) {        
          if (err) throw err;
          data = backdata;
          links = mdlinks;
          nextlink = mdnextln;
          prevlink = mdprevln;
       //   console.log(data);          
          callback();     
        });
       
      },
    
      function getSubsection(callback) {
          connection.query('SELECT * FROM scms_sub_section LIMIT 0,10',
          function(err, results, fields) {        
          if (err) throw err;
              subsection = results;    
              callback();     
          });
      },
    ], 
    function(err) { 
      if (err) return next(err);         
          console.log('render');
          var menutitle = 'Detail';
          if(data[0] != null) {
                 menutitle += data[0].art_name;
        } else {
           
        }
          res.render('pages/detail', {
            articles : data,
            subsection : subsection,
            subscname : menutitle,
          });
    });
   // res.render('pages/index');
});
//...........................................................................................
router.get('/projects',function(req, res) {

    var title = '';
    var keywords = '';
    var description = '';
    var data;
    var links;
    var nextlink;
    var prevlink;
    var model;

    str_query = 'SELECT scms_projects.* ' + 
                'FROM scms_projects WHERE pro_type_id = 1 '+
                'ORDER BY scms_projects.pro_id ASC';
 
    model = new DbSqlModel(req);
    model.setShowRows(6);
    console.log(model.int_showrows);
    model.setQuery(str_query);
    
    async.series([
             
      function getModel(callback) {
        model.build(function(err,backdata,mdlinks,mdnextln,mdprevln) {        
          if (err) throw err;
          data = backdata;
          links = mdlinks;
          nextlink = mdnextln;
          prevlink = mdprevln;
       //   console.log(data);          
          callback();     
        });
       
      },
    
  
    ], 
    function(err) { 
      if (err) return next(err);         
          console.log('render');
          res.render('pages/projects', {
            projects : data,
            arr_links : links,
            str_prevlink : prevlink,
            str_nextlink : nextlink,
          });
    });


});
//...........................................................................................

router.get('/visualisations', function(req, res) {

    var title = '';
    var keywords = '';
    var description = '';
    res.render('pages/visualisations');
});
//...........................................................................................
router.get('/contact', function(req, res) {
    var title = '';
    var keywords = '';
    var description = '';
   res.render('pages/contact');
});
router.get('/service', function(req, res) {
    // res.render('pages/index');
});
//...........................................................................................
router.get('/about', function(req, res) {
    // res.render('pages/about');
});
//...........................................................................................
module.exports = router;
