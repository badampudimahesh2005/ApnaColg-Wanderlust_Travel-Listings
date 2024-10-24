
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


# changing the image  upload functionality from link to  file upload

problems we faced 
1. the code we made so far for image cannot send image file to backend
2. after solving problem 1 and  sending the image file to backend,but mongodb stores the image file in BSON format but it has some limit  of size and it is not good for storing large images . we want to store the images with high quality  and large size but  it is not possible with mongodb BSON format . we need to  store the images in a 3rd party service like amazon  or google cloud storage . 

what is multer?
multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It is used to parse  the incoming request and extract the uploaded file(s) from the request body.

what problem we face if we dont use multer?
if we dont use multer, the image file will not be sent to the backend and we will get  an error in the backend. 

-For it is saving the images in upload folder 

- but now we set up a cloud storage to store images -->set up cloudinary and add apikey
- we are using cloudinary to store images in cloud storage and we are using multer to handle multipart

-install cloudinary and multer-storage-cloudinary

- form(file) --> backend (parse) --> cloud (store) -->url/link(store in backend)

# Create a cloudConfig.js file

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//linking the backend and the cloudn=inary account
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//configuring the storage for the images uploaded to cloudinary account 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      format: async (req, file) => 'jpg',
      allowedFormats:['jpg', 'png', 'jpeg']
    },
  });


module.exports = {cloudinary , storage}

-modify the create route to save the image in the cloudinary  account

-modify the listing model image :{url , filename}

-modify the createListing controller in listingController to save the link in the database 
-modify the data in init folder

-modify the edit listing  controller to save the image as file like above




