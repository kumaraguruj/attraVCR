const express = require('express');
//const mongoose = require('mongoose');
const sql = require('mssql');
const router = express.Router();
//const http = require('@angular/http')


//CORS Middleware
router.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
debugger;

var dbConfig = {
    "user": 'sa',
    "password": 'Mahesh#431',
    "server": 'localhost\\SQLEXPRESS',
    "database": 'attraVCR'
    
    
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){  
        console.log('DB Connected');
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         console.log('Database Connected Successfully');
                         // query to the database
                         request.query(query, function (err, data) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.json(err);
                                      sql.close()
                                     }
                                     else {                                                                           
                                      res.send(data.recordset)                                      
                                       sql.close()
                                     
                                            }
                               });
                       }
      });           
}

//GET API
router.get('/users', function(req , res){
             //   res.send('api works') ;
                var query = "select * from [users]";
               executeQuery (res, query);
});

//POST API
router.post('/videos', function(req , res){
                var query = "INSERT INTO [videos] (title,url,description) VALUES (req.body.title,req.body.url,req.body.description)";
                executeQuery (res, query)
})

//PUT API
router.put('/videos/:id', function(req , res){
                var query = "UPDATE [videos] SET title= " + req.body.title  +  " , url=  " + req.body.url + " , description = " + req.body.description + " WHERE Id= " + req.params.id;
                executeQuery (res, query);
});

//PUT API
router.get('/videos/:id', function(req , res){
    var query = "SELECT * FROM [videos] WHERE Id=" + req.params.id;
    executeQuery (res, query);
});

// DELETE API
router.delete('/videos /:id', function(req , res){
                var query = "DELETE FROM [videos] WHERE Id=" + req.params.id;
                executeQuery (res, query);
});


  router.get('/',function(req,res ){

  res.send('api works');
  });

module.exports = router;

