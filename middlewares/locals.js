module.exports=function(req,res,next){
    res.locals.isAuth = req.session.isAuth;
    res.locals.email = req.session.email;
    next();
};
