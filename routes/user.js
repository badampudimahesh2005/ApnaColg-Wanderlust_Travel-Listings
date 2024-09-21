const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { renderSignupForm, renderLoginForm, login, signup, logout } = require("../controllers/userController.js");


//Signup Route
router.get("/signup", 
  renderSignupForm
);

//Signup Post Route
router.post("/signup", 
  signup
);


//Login Route
router.get("/login", 
  renderLoginForm
);



//Login Post Route
router.post("/login",
  saveRedirectUrl,
    passport.authenticate('local',{
        failureRedirect: '/login',
        failureFlash: true
    }), 
    login
   
);


//Logout Route
router.get("/logout", 
  logout
);

module.exports = router;
