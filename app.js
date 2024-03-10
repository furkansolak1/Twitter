const express = require("express");
const app= express();
const path= require("path");
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));

require("./middlewares/static-files")(app);



const indexRoutes= require("./routes/indexRoutes");
app.use(indexRoutes);
app.listen(3000,function(){
    console.log("listening on port 3000");
    
});