
const Listing = require("../models/listing");
const User = require("../models/user");



//index route 
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

  module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  }

  
  // Show route
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


  // create route
  module.exports.createListing =async (req, res, next) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400, "Send a valid data for listing");
    // }
  
    // let result = listingSchema.validate(req.body);
  
    // if(result.error){
    //   throw new ExpressError(400,result.error)
    // }

    const url = req.file.path;
    const filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "Successfully new list is created !");
    res.redirect("/listings");
   
  
  }

//renderedit listing
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

  //update listing
  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    //new code to save the image as file when editing the listing
   if(typeof req.file !== 'undefined'){
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();

   }
    
    req.flash("success", "Successfully updated the listing !");
    res.redirect(`/listings/${id}`);
  }

  //delete listing
  module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Successfully deleted the listing !");
    res.redirect("/listings");
  }