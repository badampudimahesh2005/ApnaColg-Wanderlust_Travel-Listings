const express = require('express');
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js");



//validate reiew through middlewares
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
  
    if(error){
      throw new ExpressError(400,error)
    }else{
      next();
    }
  }

//Reviews Post Route
router.post("/",validateReview, wrapAsync(async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.review);
  
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  
  })
  );
  
  //Delete Review route
  router.delete("/:reviewId", wrapAsync(async (req,res)=>{
    let {id, reviewId}=  req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}})
    await Reviews.findByIdAndDelete(reviewId);
    
    res.redirect(`/listings/${id}`);
  
  }))


  module.exports = router;