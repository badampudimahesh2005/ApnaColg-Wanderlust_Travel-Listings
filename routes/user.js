const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
  res.render("users/signup");
}
);

router.post("/signup", async (req, res) => {
   try{
    let { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password); //register method provided by passport-local-mongoose 
    req.login(registeredUser, (err) => { //login method provided by passport  to login the user after registration  
      if (err) return next(err);
      req.flash("success", "Welcome to wanderlust!");

      res.redirect("/listings");
    });
   
   }
    catch(e){
      req.flash("error", e.message);
      res.redirect("/signup");
    }
}
);


router.get("/login", (req, res) => {
  res.render("users/login");
}
);



router.post("/login",
  saveRedirectUrl,
    passport.authenticate('local',{
        failureRedirect: '/login',
        failureFlash: true
    }), 
    async (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect(res.locals.redirectUrl || "/listings"); 
}
);

router.get("/logout", (req, res,next) => {
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success", "Goodbye!");
  res.redirect("/listings");
  });
  
}
);

module.exports = router;
