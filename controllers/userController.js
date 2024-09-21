
const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
  }



module.exports.signup =async (req, res) => {
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


  module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
  }

  module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/listings"); 
  }

  module.exports.logout =(req, res,next) => {
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", "Goodbye!");
    res.redirect("/listings");
    });
    
  }