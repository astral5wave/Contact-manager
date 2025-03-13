const asyncHandeler = require("express-async-handler");
const mongoose= require("mongoose");
const User = require("../model/userSchema");
const bcrypt =require("bcrypt");
const jwt= require("jsonwebtoken");


// @desc Register new user
//@route /api/user/register
//access Public
const registerUser = asyncHandeler(async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        res.status(401).json({message:"Registration field is missing"})
    }
    const userFind = await User.findOne({email});
    if(userFind){
        res.status(401).json({message:"User already exists"})
    }
    try{
        const hashedPassword= await bcrypt.hash(password,10);
        const userCreated= await User.create({name,email,password:hashedPassword})
        res.status(200).json(userCreated);
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

// @desc Login user
//@route /api/user/login
//access Public
const loginUser = asyncHandeler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(401).json({message:"Login field is missing, kindly enter email and password"})
    }
    try{
        const userFind= await User.findOne({email});
        if (userFind && await bcrypt.compare(password,userFind.password)){
            const token= await jwt.sign(
                {userData:{
                    "name":userFind.name,
                    "email":userFind.email,
                    "userId": userFind.id
                    }
                },
                process.env.SECRET,
                {expiresIn:"15m"});          //token generated 
            const userFindObj=userFind.toObject();
            userFindObj.token=token;
            res.status(200).json(userFindObj);
        }
        else{
            res.status(400).json({message:"Enter a valid email and password"});
        }
    }
    catch(e){
        console.log(e.message);
        res.status(401).json({message:e.message});
    }

})

// @desc View current user
//@route /api/user/current
//access Private
const currentUser = asyncHandeler(async (req,res)=>{
    res.status(200).json(req.userData);
})









module.exports= {registerUser,loginUser,currentUser}
