const {User,validateRegister} = require("../models/user");
const {Tweet} = require("../models/tweet");
const fs = require("fs");
exports.post_createTweet= async function(req,res,next){
    const email = req.session.email;
    const content = req.body.content
    let resim="";
    
    if(req.file) {
        resim = req.file.filename;
        const dosyayolu= "./public/images/"+req.body.resim;
        await fs.unlink(dosyayolu, err => {
            if (err) {
                console.error('Dosya silinirken bir hata oluştu:', err);
            } else {
                console.log('Dosya başarıyla silindi.');
            }
        });
        
        
    }
    try{
        const user =await  User.findOne({email:email}).exec();
        let tweet;
        if (resim != ""){

            tweet = new Tweet({
                owner:user._id,
                content:content,
                photo:resim,
            })
        }
        else{
            tweet = new Tweet({
                owner:user._id,
                content:content
                
            })
        }
        
        await tweet.save();
        res.redirect("/twitter");
        
        
        
    }
    catch(err){
        console.log(err);
    }
}
exports.index= async function(req,res,next){
    const email = req.session.email;
    const aranan= req.query.aranan
    try{
        
        const user =await  User.findOne({email:email}).exec();
        let arananuser;
        let arananTweets;
        if(aranan){
             arananuser=await  User.findOne({name:aranan}).exec();
             arananTweets= await Tweet.find({owner:arananuser._id}).populate("owner");
            
        }
            
        var day = user.birthday.getDate();
        var monthIndex = user.birthday.getMonth(); 
        var year =user.birthday.getFullYear(); 
        var months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        var monthName = months[monthIndex];
        var formattedDate = day + ' ' + monthName + ' ' + year;
        
        const userTweets = await Tweet.find({owner:user._id}).populate("owner");
        const followingUser = await User.find({folowers: { $in: user._id}});
        let list =[];
        for(let i=0;i<followingUser.length;i++){
            list.push(followingUser[i]._id)
        }
        const followingTweets= await Tweet.find({owner:list}).limit(3).sort({createdAt:1}).populate("owner");
        
        
        res.render("user/index",{
            title:"X. Olan biten burada",
            csrfToken:req.csrfToken(),
            dateStr:formattedDate,
            userTweets:userTweets,
            arananuser:arananuser,
            user:user,
            arananTweets:arananTweets,
            followingTweets:followingTweets
        });
        
        
        
    }
    catch(err){
        console.log(err);
    }
}
exports.takipet= async function(req,res,next){
    const email = req.session.email;
    const arananid= req.body.arananid;
    try{
        
        const user =await  User.findOne({email:email}).exec();
        let arananuser=await User.findOne({_id:arananid}).exec();
        
        await User.updateOne({ _id: user._id }, { $push: { folowing: arananuser } });
        await User.updateOne({ _id: arananuser._id }, { $push: { folowers: user } });
         
        
        
        
        
        res.redirect("/twitter");
        
        
        
    }
    catch(err){
        console.log(err);
    }
}
exports.begen= async function(req,res,next){
    const email = req.session.email;
    const tweetid= req.body.tweetid;
    try{
        const user =await  User.findOne({email:email}).exec();
        await Tweet.updateOne({ _id: tweetid}, { $push: { likes: user } });
        res.redirect("/twitter");
    }
    catch(err){
        console.log(err);
    }
}

exports.rt= async function(req,res,next){
    const email = req.session.email;
    const tweetid= req.body.tweetid;
    try{
        const user =await  User.findOne({email:email}).exec();
        await Tweet.updateOne({ _id: tweetid}, { $push: { rt: user } });
        res.redirect("/twitter");
    }
    catch(err){
        console.log(err);
    }
}
