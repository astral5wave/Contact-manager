const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"                           // map this contact Schema object to User Schema object
    },
    name: {
        type: String,
        required: [true, "Plz add the contact name"]     // it is required and if error occured then String is sent as message
    },
    email: {
        type: String,
        required: [true, "Plz enter the email for the contact"]
    },
    phone: {
        type: String,
        required: [true, "Plz enter the phone number of the contact"]
    }
}, {
    timestamps: true
}
);               // Schema for Contact is created

// now we need to link the Schema to a collection so all the documents inside that collection follows same schema


// this is done by creating a MODEL which links a Schema to a Collection and All the documents of that model follows same Schema for a Collction

module.exports = mongoose.model("Contact",contactSchema);         // Contact is Model name which links to contacts collection in DATABASE


// if model name is XYZ or Xyz this points to "xyzs" collection in databse (lowercase pluralised version of Model name)