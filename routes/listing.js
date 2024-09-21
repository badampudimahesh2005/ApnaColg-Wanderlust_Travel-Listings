const express = require('express');


const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const { index, renderNewForm, showListing, createListing, editListing, updateListing, deleteListing } = require('../controllers/listingController.js');

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
router.get("/", wrapAsync(index)
  );
  
  
  //New Route
  router.get("/new", 
    isLoggedIn,
     renderNewForm
    );

  
  //Show Route
  router.get("/:id",
     wrapAsync(showListing)
  );




  
  //Create Route
  router.post("/", 
    isLoggedIn,
    validateListing,
    wrapAsync(createListing)
  );
  

  //Edit Route
  router.get("/:id/edit",
    isLoggedIn,
     wrapAsync(editListing)
  );
  

  
  //Update Route
  router.put("/:id", 
    isLoggedIn,
    isOwner,
    validateListing,
     wrapAsync(updateListing)
  );
  

  //Delete Route
  router.delete("/:id",
    isLoggedIn,
    isOwner, 
    wrapAsync(deleteListing)
  );
  

  module.exports = router;