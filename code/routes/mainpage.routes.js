const express = require("express");
const User = require("./../schemas/UserSchema.js");
const passport = require("passport");
//const mongoose = require("mongoose");

const router = express.Router();


/* router.get("/main", function(req,res){
        if (req.isAuthenticated()){
          res.render("secrets");
        }else{
          res.redirect("/login");
        }
});  */


module.exports = router;