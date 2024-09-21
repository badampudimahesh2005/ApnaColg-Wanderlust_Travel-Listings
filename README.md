
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

-create login button in header  and link to login route
-create  logout button in header and link to logout route and show only when user is not logged in -> using req.user(access by locals)

-create the functionality -> after signup user get login automatically, for this we use login method from passport
-create the functionality -> when user try to create|edit|update listing without login ,it navigates to login page then after login ,it should navigate again to the orginal page which is create|edit|update  (req.path , req.originalUrl)

created listing owner

# authorization for listing
-show the edit and delete button to only owner of the listing in show route
- and only the owners can edit or delete the listing

# authorization for reviews
-create auther field in review schema reference from user
-creating  the functionality that only logined user can create the review  -> non-logined used cannot create the  review 

-we can do this by comparing the current user and  the author of the review 


-creating MVC model
-styling the review page

