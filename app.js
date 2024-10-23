
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const flash = require("connect-flash");

// const Listing = require("./models/listing.js");
// const Reviews = require("./models/reviews.js");
// const wrapAsync = require("./utils/wrapAsync.js");
// const {listingSchema, reviewSchema} = require("./schema.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRoutes = require("./routes/listing.js");
const reviewsRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");
const { console } = require('inspector');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";



/**
 * The above code snippet connects to a MongoDB database using Mongoose in a Node.js application.
 */
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname,"public")));

const sessionConfig = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,

  }
}



app.get("/", (req, res) => {
  res.send(process.env.KEY);
});


app.use(session(sessionConfig));
// we should use flash after routes because we want to use flash in routes  and flash should be used after session
app.use(flash());


/* `app.use(passport.initialize());` is initializing Passport middleware in the Express application.
Passport is a popular authentication middleware for Node.js that provides a simple way to
authenticate users using different strategies such as username and password, OAuth, etc. */
app.use(passport.initialize());

/* `app.use(passport.session());` is setting up Passport to use session-based authentication in the
Express application. This middleware is responsible for restoring authentication state across HTTP
requests. When a user is authenticated, Passport will serialize the user instance to the session.
Subsequently, for each request, Passport will deserialize the user instance, providing it as
`req.user`. This allows the application to maintain user authentication state across requests. */
app.use(passport.session());

/* The line `app.use(new LocalStrategy(User.authenticate()));` is setting up a local authentication
strategy using Passport.js in your Express application. */
passport.use(new LocalStrategy(User.authenticate()));

/* `passport.serializeUser(User.serializeUser());` and
`passport.deserializeUser(User.deserializeUser());` are setting up serialization and deserialization
functions for Passport.js in the Express application. */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
}
);

// app.get("/fakeUser", async (req, res) => {
//   const user = new User({ email: "user@gmail.com", username: "user" }); 
//   const newUser = await User.register(user, "chicken");
//   res.send(newUser);
// }
// );





app.use("/listings", listingsRoutes);

app.use("/listings/:id/reviews", reviewsRoutes);

app.use("/", userRoutes);

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.all("*", (req,res, next)=>{
next(new ExpressError(404, "Page Not found!"));
})


app.use((err, req, res, next)=>{
  let {statusCode=500, message="Something Went Wrong!"}=err;
  res.status(statusCode).render("listings/error.ejs", {err});
})


app.listen(8080, () => {
  console.log("server is listening to port 8080");
});