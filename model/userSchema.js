const mongoose =require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Enter a name"]
    },
    email:{
        type:String,
        required:[true,"Enter an email plz"],
        unique:[true,"Email already exits"]
    },
    password:{
        type:String,
        required:[true,"Please Enter a password"]
    }
},{timestamps:true});

module.exports= mongoose.model("User",userSchema);  //collection name : "users" in database and follows userSchema for every document.