const Express=require("express");
const router =Express.Router();  //router created
const {getContact,deleteContact,postContact,getContactID,putContactID,deleteContactID} = require("../controllers/contactController")
const validateToken=require("../Middleware/validateToken")

router.use(validateToken);  // protected route by toke validator middleware



//multiple routes withing same router

router.route("/")                    // if route is /api/contact
    .get(getContact)       //callbacks
    .post(postContact)
    .delete(deleteContact);

// if route is /api/contact/parameters 
router.route("/:iddd")
    .get(getContactID)       
    .put(putContactID)
    .delete(deleteContactID);


module.exports = router;