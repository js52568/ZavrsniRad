//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const User = require("./schemas/UserSchema.js");
//require i ostale

const registerRoute = require('./routes/register.routes');
const loginRoute = require('./routes/login.routes');
const mainpageRoute = require('./routes/mainpage.routes');
const authGoogleRoute = require('./routes/authgoogle.routes');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/testSportsDB", {useNewUrlParser: true});

/* userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User",userSchema); */

/* const user1 = new User({
    fullName: "Jura Slehan",
    nickname: "juju"
  });

user1.save(); */

passport.use(User.createStrategy());

passport.serializeUser(function(user,done) {
  done(null, user.id);
});

passport.deserializeUser(function(id,done) {
  User.findById(id, function(err,user) {
    done(err,user.id);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/main",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

app.get("/", function(req,res) {
  res.render("home");
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.use('/register', registerRoute);

app.use('/login', loginRoute);

app.use('/main', mainpageRoute);

//app.use('/auth/google', authGoogleRoute);

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get('/auth/google/main',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/main');
  }); 

app.post("/register", function(req,res) {

    User.register({username: req.body.username}, req.body.password, function(err, user){
      if(err){
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req,res, function(){
          res.redirect("/main");
        });
      }
    });
  
});

app.get("/main", function(req,res){
    if (req.isAuthenticated()){
      res.render("secrets");
    }else{
      res.redirect("/login");
    }
  });

app.post("/login", function(req,res) {

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function(err){
      if(err){
        console.log(err);
      } else {
        passport.authenticate("local")(req,res,function(){
          res.redirect("/main");
        });
      }
    });
  
  });


app.listen(3000,function() {
  console.log("Server started on port 3000");
});
