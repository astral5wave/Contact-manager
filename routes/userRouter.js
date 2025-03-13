const express= require("express");

const router=express.Router();
const {registerUser,loginUser,currentUser} = require("../controllers/userController");
const validateToken= require("../Middleware/validateToken");


router.route("/register")
    .post(registerUser)

router.route("/login")
    .post(loginUser)

router.route("/current")
    .get(validateToken,currentUser)

module.exports =router;