const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image :{
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,

  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Reviews"
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});


/* This code snippet is setting up a middleware function in the Mongoose schema for a listing. The
middleware function is triggered after a `findOneAndDelete` operation is performed on a listing
document. */
// middleware to delete the reviews corresponds listing , when listing is deleted 
listingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in : listing.reviews}});
  }

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
