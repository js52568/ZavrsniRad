const express = require("express");
const User = require("./../schemas/UserSchema.js");
const passport = require("passport");
//const mongoose = require("mongoose");

const router = express.Router();

router.get("/", function(req,res){
    res.render("login");
});

/* router.post("/", function(req,res) {

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
  
  }); */

module.exports = router;