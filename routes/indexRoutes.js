const express =require("express");
const router = express.Router();
router.use("/",(req,res)=>{
    try{
        res.render("index",{
            title:"deneme"
        });
    }
    catch(err){
        console.log(err);
    }
});
module.exports=router;