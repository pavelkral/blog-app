var async = require('async');
var connection = require('../modules/dbconnection');
var modeldata;

function DbSqlModel(request) {

	this.req = request;
	this.int_showrows = 2;
  this.int_startrow = 1;  
  this.str_query = '';
  this.dataready = false;


  this.setShowRows = function(rows) {

    this.int_showrows = rows;

  };
    
};


DbSqlModel.prototype.setQuery = function(query) {

	this.str_query = query;
	
};
DbSqlModel.prototype.build = function(cb) {

	var str_query = this.str_query;
	var req = this.req;
	var int_showrows = this.int_showrows;
	var int_startrow = this.int_startrow;
	var int_foundrows;
	var int_pagecount;   
	var arr_data = {};
	var arr_links = [];
	var str_nextlink;
	var str_prevlink;

	async.series([

      function countRows(callback) {
        connection.query(str_query,function(err, results, fields) {        
          if (err) throw err;
          int_foundrows = Object.keys(results).length;
          console.log(int_foundrows);      
          callback();     
        });
      },
      function buildModel(callback) {

        if (req.query.showrows == undefined) {
           // int_showrows = 2;    
        } else {           
            int_showrows = req.query.showrows;
        }
     
        if (req.query.start == undefined) {
                 //   int_startrow = 1;
        } else {
            int_startrow = req.query.start;
        }

        int_pagecount = int_foundrows / int_showrows;
        console.log(int_pagecount);
        int_pagecount = Math.ceil(int_pagecount);
        console.log(int_pagecount);
        console.log(int_startrow);
        if (int_foundrows < int_showrows) {
            str_query = str_query;

        } else {
            str_query = str_query + ' limit ' + (int_startrow - 1) + ', ' + int_showrows;
        }

         if (int_pagecount <= 1) {
            
        }
         else {

            var offset = 1;
            var selected = '';
            var curent = 1;
            var arr = [];
            
              for (var i = 1; i <= (int_pagecount); i++) {

               if (i >= 2) {
                  int_showrows  =  parseInt(int_showrows)
                  offset  =  parseInt(offset)
                  offset =  offset + int_showrows;
                } else {
                }
                    
                   if (offset == int_startrow) {
                        selected = 'class="active"';
                        curent = i;
                    } 
                    else if (int_startrow == 1 && i == 1) {
                        selected = 'class="active"';
                        curent = i;
                    } 
                     else{
                        selected = '';
                    }
                    
                 arr[i] =  '<li '+ selected + '><a href="?start=' + (offset) + '&amp;showrows=' + (int_showrows) + '"><strong>' + i + '</strong></a></li>';
           
            }            
            arr_links[0]= arr[curent-2];
            arr_links[1]= arr[curent-1];
            arr_links[2]= arr[curent];
            arr_links[3]= arr[curent+1];            
            arr_links[4]= arr[curent+2];
            
            int_showrows  =  parseInt(int_showrows)
            int_startrow  =  parseInt(int_startrow)  

            if (int_startrow < int_showrows) {
              str_prevlink = '';
            } 
            else {
              str_prevlink = '<li><a href="?start=' + (int_startrow - int_showrows) + '&amp;showrows=' + (int_showrows) + '">&lt;&lt;</a></li>';
            }
            if ((int_startrow + int_showrows) > int_foundrows) {
              str_nextlink = "";
            } 
            else {
             str_nextlink = '<li><a href="?start=' + (int_startrow + int_showrows) + '&amp;showrows=' + (int_showrows) + '">&gt;&gt;</a></li>';
            }
        }
        callback();	
      
      },

      function getData(callback) {
          connection.query(str_query,function(err, results, fields) {        
            if (err) throw err;
              arr_data = results;
              console.log(Object.keys(arr_data).length); 	          
              this.dataready = true;
              console.log(this.dataready)
              callback();    
            });
      },
       
    ], 
    function(err) { 
      if (err) return next(err);
      	cb(null,arr_data,arr_links,str_nextlink,str_prevlink);
    });
	
};

DbSqlModel.prototype.getData = function(){

	return modeldata;

};



module.exports = DbSqlModel;

