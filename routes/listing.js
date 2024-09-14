const express = require('express');


const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

const {isLoggedIn} = require("../middleware.js");

/**
 * The function `validateListing` validates a request body against a schema and throws an error if
 * validation fails.
 * @param req - The `req` parameter typically represents the request object in a Node.js application.
 * It contains information about the HTTP request that was made, such as the request headers,
 * parameters, body, and more. In this context, `req.body` likely refers to the body of the request,
 * which is being
 * @param res - The `res` parameter in the `validateListing` function is typically used to send a
 * response back to the client making the request. It is an object representing the HTTP response that
 * the server sends back to the client. This response can include status codes, headers, and data.
 * @param next - The `next` parameter in the `validateListing` function is a callback function that is
 * used to pass control to the next middleware function in the stack. When `next()` is called, it tells
 * Express to move on to the next middleware function.
 */
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
  
    if(error){
      throw new ExpressError(400,error)
    }else{
      next();
    }
  }

//Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
  );
  
  
  //New Route
  router.get("/new", isLoggedIn,(req, res) => {

    res.render("listings/new.ejs");
  });
  
  //Show Route
  router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
      req.flash("error", "Cannot find the listing !");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
  );
  
  //Create Route
  router.post("/", isLoggedIn,validateListing,wrapAsync(async (req, res, next) => {
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
   
  
  })
  );
  

  //Edit Route
  router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Cannot find the listing !");
      return res.redirect("/listings");
    }
    req.flash("success", "Successfully edited the listing !");
    res.render("listings/edit.ejs", { listing });
  })
  );
  

  
  //Update Route
  router.put("/:id", isLoggedIn,validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Successfully updated the listing !");
    res.redirect(`/listings/${id}`);
  })
  );
  

  //Delete Route
  router.delete("/:id",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Successfully deleted the listing !");
    res.redirect("/listings");
  })
  );
  

  module.exports = router;