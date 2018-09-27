
const express=require('express');
const app=express();
const vcrRoute=require('./routes/vcr');
app.use(express.json());
//require('./startups/db')();
app.use('/api',vcrRoute);

app.listen(3012,()=>{console.log("Service is running on the port:3012...")});