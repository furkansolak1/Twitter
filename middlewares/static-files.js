const express = require("express");
const path= require("path");
module.exports=function(app){
    app.use("/libs",express.static(path.join(__dirname,"../node_modules")));
    //console.log(path.join(__dirname,"../node_modules"));
    app.use("/static",express.static(path.join(__dirname,"../public")));
    console.log(path.join(__dirname,"../public"));
}