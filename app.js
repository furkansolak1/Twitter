// express
const express = require("express");
const app= express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require("csurf");
const config=require("config");

// routes
const indexRoutes= require("./routes/indexRoutes");
const userRoutes = require("./routes/userRoutes");
// custom modules

const locals = require("./middlewares/locals");
// template engine
app.set("view engine","ejs");
// models
const User= require("./models/user");

const mongoose= require("mongoose");

const username = config.get("db.username");
const password = config.get("db.password");
const database = config.get("db.database"); 
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.1fcmwa2.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=> console.log("mongodb bağlantısı kuruldu"))
    .catch(err=>process.exit(1));








// midllewares
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const store = new MongoDBStore({
  uri: `mongodb+srv://${username}:${password}@cluster0.1fcmwa2.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`,
  databaseName: 'twitter',
  collection: 'mySessions'
});

store.on('error', (error) => {
  console.log(error);
});
  app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24  // 1 day
    },
    store:store,
    resave: false,
    saveUninitialized: false
  }));
app.use(locals);
app.use(csurf());
// static files 
app.use("/libs",express.static("node_modules"));
app.use("/static",express.static("public"));






app.use(indexRoutes);
app.use(userRoutes);


app.listen(3000,function(){
    console.log("listening on port 3000");
    
});