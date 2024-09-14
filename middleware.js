const Listing = require("./models/listing");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be signed in!");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl =req.session.redirectUrl; 
    }
    next();

}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
  if( !listing.owner._id.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not owner of the listing !");
    return res.redirect(`/listings/${id}`);
  }

    next();
}