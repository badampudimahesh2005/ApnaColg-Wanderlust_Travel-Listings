
const Listing = require("../models/listing");
const User = require("../models/user");



module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

  module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  }

  
  module.exports.showListing =async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
          path: "author"
      },
    })
    .populate("owner");

    if(!listing){
      req.flash("error", "Cannot find the listing !");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }


  module.exports.createListing =async (req, res, next) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400, "Send a valid data for listing");
    // }
  
    // let result = listingSchema.validate(req.body);
  
    // if(result.error){
    //   throw new ExpressError(400,result.error)
    // }
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully new list is created !");
    res.redirect("/listings");
   
  
  }


  module.exports.editListing =async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Cannot find the listing !");
      return res.redirect("/listings");
    }
    req.flash("success", "Successfully edited the listing !");
    res.render("listings/edit.ejs", { listing });
  }

  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Successfully updated the listing !");
    res.redirect(`/listings/${id}`);
  }

  module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Successfully deleted the listing !");
    res.redirect("/listings");
  }