
const {User,validateRegister} = require("../models/user");
const crypto= require("crypto");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/sendMail");
exports.post_createPassword= async function(req,res,next){
    const email = req.session.email;
    const password = req.body.password;
    try{
        const user =await  User.findOne({email:email}).exec();
        const hashedPassword = await bcrypt.hash(password,10);
        user.password= hashedPassword;
        await user.save();
        res.redirect("/twitter");
    }
    catch(err){
        console.log(err);
    }
}
exports.get_createPassword= async function(req,res,next){
    try{
        res.render("createPassword",{
            title:"X. Olan biten burada",
            csrfToken:req.csrfToken()
        });
    }
    catch(err){
        console.log(err);
    }
}
exports.post_signupVerification=async function(req,res,next){
    const name = req.body.ad;
    const date = req.body.date;
    const email= req.body.email;
    const token = req.body.token;
    const checkToken = req.session.emailToken;
    const deneme = req.body.deneme;
    try{
        if(deneme == 1){
            return res.redirect("/signup");
        }
        if(checkToken!= token){
            return res.render("signupVerification",{
                title:"X'e kaydol",
                email:email,
                date:date,
                ad:ad,
                deneme:deneme-1
            });
        }
        const {error}= validateRegister({
            name:name,
            email:email,
            birthday:date
        });
        if(error){
            console.log("validate error ",error);
        }
        user = new User({
            name:name,
            email:email,
            birthday:date
        })
        await user.save();
        req.session.isAuth =1;
        req.session.email= user.email;
        res.redirect("/createpassword");

       
     }
     catch(err){
         console.log(err);
     }
}
exports.post_signup=async function(req,res,next){
    const ay = req.body.ay;
    const gun = req.body.gun;
    const yil = req.body.yil;
    const email= req.body.email;
    const ad = req.body.name;
    const token = crypto.randomBytes(3).toString('hex');
   
   try{
       console.log(ad);
       const user =await  User.findOne({email:email}).exec();
       console.log(user);
       if(user){
            req.session.message="E-posta adresi başka bir hesaba ait."
            return res.redirect("/signup")
       }
       const date = new Date(yil,ay,gun);
       emailService.sendMail({
        from:"furkanasdf26@gmail.com",
        to:email,
        subject:"Email Doğrulama",
        text:"Emailinizi doğrulamak için lütfen kodu giriniz. "+token
         });
        req.session.emailToken=token;
       res.render("signupVerification",{
            title:"X'e kaydol",
            email:email,
            date:date,
            ad:ad,
            deneme:2
            
        });
    }
    catch(err){
        console.log(err);
    }
}
exports.get_signup=async function (req,res,next){
    const aylar=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    const gunler=[];
    const yillar =[];
    const message = req.session.message;
    delete req.session.message;
    for(i=1;i<31;i++){
        gunler.push(i);
    }
    for(i=2024;i>1900;i--){
        yillar.push(i)
    }

    try{
        res.render("signup",{
            title:"X'e kaydol",
            aylar:aylar,
            gunler:gunler,
            yillar:yillar,
            message:message,
            csrfToken:req.csrfToken()
        });
    }
    catch(err){
        console.log(err);
    }
}
exports.get_index= async function(req,res,next){
    try{
        res.render("index",{
            title:"X. Olan biten burada"
        });
    }
    catch(err){
        console.log(err);
    }
}
exports.get_login= async function(req,res,next){
    const message = req.session.message;
    delete req.session.message;
    try{
        res.render("login",{
            title:"X. Olan biten burada",
            csrfToken:req.csrfToken(),
            message:message
        });
    }
    catch(err){
        console.log(err);
    }
}
exports.post_login= async function(req,res,next){
    const email = req.body.email;
    const password= req.body.password;
    try{
        const user =await  User.findOne({email:email}).exec();
        if(!user){
            req.session.message= "email veya parola hatalı";
            res.redirect("/login")
        }
        const match = await bcrypt.compare(password,user.password);
        if(match){
            req.session.isAuth =1;
            req.session.email= email;
            return res.redirect("/twitter");
        }
        req.session.message= "email veya parola hatalı";
        res.redirect("/login")
    }
    catch(err){
        console.log(err);
    }
}