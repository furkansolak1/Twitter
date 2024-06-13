exports.index= async function(req,res,next){
    const email = req.session.email;
    
    try{
        res.render("user/index",{
            title:"X. Olan biten burada"
        });
        
        
        
    }
    catch(err){
        console.log(err);
    }
}