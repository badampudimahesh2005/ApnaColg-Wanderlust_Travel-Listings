const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
   
    email :{
        type: String,
        required: true,
        
    },

    });
    
// You're free to define your User how you like. Passport-Local Mongoose will add a username,
// hash and salt field to store the username, the hashed password and the salt value.
// Additionally, Passport-Local Mongoose adds some methods to your Schema. See the API


/* The line `userSchema.plugin(passportLocalMongoose);` is using the `passportLocalMongoose` plugin to
enhance the `userSchema` schema. This plugin adds additional fields and methods to the schema that
are useful for implementing local authentication using Passport.js in a Node.js application. */

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model("User", userSchema);
module.exports = User;