const express =require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.get("/twitter",userController.index);
module.exports=router;