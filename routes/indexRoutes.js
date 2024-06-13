const express =require("express");
const router = express.Router();

const indexController= require("../controllers/indexController");
const csrf = require("../middlewares/csrf");
router.get("/signup")
// router.get("/signup/verification",csrf,indexController.get_signupVerification);
router.get("/createpassword",csrf,indexController.get_createPassword);
router.post("/createpassword",csrf,indexController.post_createPassword);
router.post("/signupverification",csrf,indexController.post_signupVerification);
router.post("/signup",csrf,indexController.post_signup);
router.get("/signup",csrf,indexController.get_signup);
router.get("/",csrf,indexController.get_index);
router.get("/login",csrf,indexController.get_login);
router.post("/login",csrf,indexController.post_login);

module.exports=router;