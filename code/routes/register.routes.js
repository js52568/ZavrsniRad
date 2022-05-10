const express = require("express");
const User = require("./../schemas/UserSchema.js");  
const passport = require("passport");
//const mongoose = require("mongoose");

const router = express.Router();

router.get("/", function(req,res){
    res.render("register");
});

/* router.post("/", function(req,res) {

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
  
  }); */

module.exports = router;