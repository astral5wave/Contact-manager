const mongoose = require("mongoose");

const connectDb = async ()=>{
    try{
        const connect= await mongoose.connect(process.env.CONNECTION_STRING);       //try to connect with atlas
        console.log("Database Connected",connect.connection.host,connect.connection.name);
    }
    catch(err){
        console.log(err.message);
        process.exit(1);                     //if error occured then this will terminates the running server as db is not connected, Restart to see if it connects again or not.
    }
}

module.exports= connectDb;