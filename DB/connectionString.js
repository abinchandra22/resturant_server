const mongoose = require('mongoose')

// process is aglobal object in node , global-we can ascess any where with out export and import
const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb connected successfully");
}).catch((reason)=>{
    console.log(reason);
    console.log("Mongodb connection failed");
})