//const sql = require('mssql')
var sql=require('mssql');
 
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