const asyncHandeler = require("express-async-handler")  //manage and send errors to error handler automatically
const mongoose= require("mongoose");
const Contact = require("../model/contactSchema");
//use to control all req and res ,all complex logic are handeled here only

// @desc GET all contacts
//@route /api/contact
//access Private

const getContact = asyncHandeler(async (req,res)=>{
    const contact = await Contact.find({uid:req.userData.userId});
    res.json(contact);
})


// @desc POST all contacts
//@route /api/contact
//access Private

const postContact = asyncHandeler(async(req,res)=>{
    //console.log(req.body);
    const {name,email,phone}= req.body;          // body is not parsed into json if no parser is used 
    if(!name || !email || !phone){
        throw new Error("Field is missing")
    }                                          // this is just to validate the filed of the body on server itself , rather than geeting error from the database
    try{
        const createdContact =await Contact.create({name,email,phone,uid:req.userData.userId});
        console.log("contact created");
        res.json(createdContact);
    }
    catch(err){
        throw err.message("Contact creation failed");
    }

})




// @desc DELETE all contacts
//@route /api/contact
//access Private

const deleteContact = asyncHandeler(async(req,res)=>{
    try{
        await Contact.deleteMany({uid:req.userData.userId});
        console.log("All Contact deleted");
        res.status(200).send("All Contact deleted");
    }
    catch(e){
        console.log(e);
        res.status(400).send("Failed to delete all due to error");
    }
})


// @desc GET a contact
//@route /api/contact/iddd
//access Private

const getContactID = asyncHandeler(async (req,res)=>{
    try{
        const contact = await Contact.findOne({uid:req.userData.userId,_id:req.params.iddd});
        if(contact){
            res.json(contact);
        }
        else{
            res.status(300).send("No such contact found");
        }
    }
    catch(e){
        res.status(400).send("Error occuer during fetching Contact")
    }
})




// @desc PUT a contact
//@route /api/contact/iddd
//access Private

const putContactID = asyncHandeler(async(req,res)=>{
    const foundContact=await Contact.findOne({uid:req.userData.userId,_id:req.params.iddd});
    if(!foundContact){
        res.status(400).json({message:"Contact not found"})
    }
    try{
        const updated= await Contact.findOneAndUpdate({uid:req.userData.userId,_id:req.params.iddd},{...req.body},{new:true});    //1st argument to filter the data and get the exact document , next is updated part,next is want to show updated or old data
        console.log("Contact updated");
        res.status(200).json(updated);
    }
    catch(err){
        res.status(400).send(err.message);
    }

    
})



// @desc DELETE a contact
//@route /api/contact/idd
//access Private

const deleteContactID = asyncHandeler(async(req,res)=>{
    const foundContact=await Contact.findOne({uid:req.userData.userId,_id:req.params.iddd});
    if(!foundContact){
        res.status(400).json({message:"Contact not found"})
    }
    try{
        const deletedContact= await Contact.findOneAndDelete({uid:req.userData.userId,_id:req.params.iddd});
        console.log("Contact deleted",deletedContact);
        res.status(200).send(deletedContact);
    }
    catch(err){
        res.status(400).json({message:"Error during deleting the contact"});
        
    }
})



module.exports = {getContact,postContact,deleteContact,getContactID,putContactID,deleteContactID};