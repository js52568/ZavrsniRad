const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  password: String,
  googleId: String,
  description: String,
  friendsIds: [String],
  invitationsIds: [String],    
  ratingIds: [String],        
  friendRequestsIds: [String], 
  cancelationsIds: [String],
  eventsIds: [String]  
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User",userSchema);

module.exports = User;