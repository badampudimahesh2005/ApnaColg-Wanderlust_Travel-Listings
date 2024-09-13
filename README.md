
# Error Handling
.validation for schema
install joi
create schema for validation 

# Reviews
-create review model 
-setting up the review form in show.ejs
-submitting the form
POST /liftings/:id/reviews

-validation for the form from client side
-validation for the form from server side
    .create schema for validation using joi
    .require schema in app.js 
    .write a validate method 
    .pass the validate method as middlewear

-render comments to show route page (.populate("reviews))
-deleting the review in the route /listings/:id/reviews/:reviewId
-MONGO $pull operator
The $pull operator removes from an existing array all instances of a value or values that match a
specified condition.

-using express.Router() for handiling routes easily 

# Authentication and Authrization

-cookies
- express-session and content-flash
-Hashing and Salting
-passportJs -> authentication middleware for nodejs used in express
 {
    npm i passport
    npm i passport-local
    npm i passport-local-mongoose (when we are using mongoose db)

 }


-creating user model
You're free to define your User how you like. Passport-Local Mongoose will add a username,
hash and salt field to store the username, the hashed password and the salt value.
Additionally, Passport-Local Mongoose adds some methods to your Schema. See the API

-using passport middleware
{
app.use(passport.initialize());
app.use(passport.session());
app.use(new LocalStrategy(User.authenticate()));

}

-SignUp a user
 -create new express router for user
 -create signup route
 -create form
 -storing the data in db and validation using try catch rather than wrapasync to make display error in same page 
 
 -create login route and form 
 -create authentication with passport

- "" creating the functionality that only logined user can create the listing  -> non-logined used cannot create the listing""
- we can do this by using passport.isAuthenticated()

-create a logout route