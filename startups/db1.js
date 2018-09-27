const mongoose=require('mongoose');
module.exports=function()
{

mongoose.connect('mongodb://gajjalamahesh:Mahesh#431@ds145121.mlab.com:45121/testdb1234_gcloud',{useNewUrlParser:true})
.then(()=>{console.log("database is connected")});

// mongoose.connect('mongodb://localhost:27017/AttraLive',{useNewUrlParser:true})
// .then(()=>{console.log("database is connected")});

} 