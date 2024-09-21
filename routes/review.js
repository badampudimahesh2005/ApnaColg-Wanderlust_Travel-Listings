const express = require('express');
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require('../middleware.js');
const { createReview, deleteReview } = require('../controllers/reviewController.js');



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
router.post("/", 
   isLoggedIn ,
    validateReview, 
    wrapAsync(createReview)
  );
  

  //Delete Review route
  router.delete("/:reviewId",
     isLoggedIn,
     isReviewAuthor,
     wrapAsync(deleteReview)
);


  module.exports = router;