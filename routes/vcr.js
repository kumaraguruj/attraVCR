const express = require('express');
//const conn = require('../startups/db');
const router = express.Router();
var sql=require('mssql/msnodesqlv8');
require("msnodesqlv8");
router.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// var dbConfig = {    
//     "server": 'ATLT924\\SQLEXPRESS',
//     "database": 'attraVCR'   ,
//     "driver": "msnodesqlv8",   
//     "options" : {
//         trustedConnection: true
//     }
    
// };

var dbConfig = {   
"user": 'attra@attradbserver',
    "password": 'Password@1',
    "server": 'tcp:attradbserver.database.windows.net',
    "database": 'attraVCR'  
};
sql.connect(dbConfig, function (err) {
    if (err) {   
        console.log("Error while connecting database :- " + err);
        res.send(err);
     }
    console.log("database is connected....")
})

router.get('/checkuser',(req,res)=>{

   // console.log(req.headers.username);
var username=req.headers.username;
var password=req.headers.password;

var dbrequest = new sql.Request();

var sqlquery = "SELECT * FROM users WHERE Username ='"+username+"' and Password ='"+password+"'";
//console.log(sqlquery);
dbrequest.query(sqlquery,function(err,data){
    if (err) {
        console.log("Error while querying database :- " + err);
        res.json(err);
        
       }
       else {      
           console.log("hiiting");
        var user_temp={};
            if(data.recordset.length!=0)      
            {                
               
                user_temp.username=data.recordset[0].Username;
                user_temp.isValidUser=true;
                                                         
                res.send(user_temp).status(200);  
                //console.log(user_temp) ;
                res.end();      
            }                          
            else
                {
                    user_temp.username=username;
                    user_temp.isValidUser=false;
                    res.json(user_temp).status(404); 
                    res.end();
                }
      // console.log(data.recordset.length);
              }

});


});

module.exports=router;