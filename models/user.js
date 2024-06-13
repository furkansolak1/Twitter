const {Schema,mongoose}= require("mongoose");
const Joi = require("joi");
const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:String,
    birthday:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    phoneNumber:String,
    phoneVerification:Boolean,
    token:String,
    tokenExpiration:Date,
    resetToken:String,
    resetTokenExpiration:Date,
    twoFactorEnabled:Boolean,
    // takipçi sayısı
    numberOfFollowee:Number,
    // takip edilen sayısı
    numberOfFollowers:Number,
    bio:String,
    website:String,
    image:String,
    folowers:[{type:Schema.Types.ObjectId,ref:"User"}],
    folowing:[{type:Schema.Types.ObjectId,ref:"User"}]
});
function validateRegister(user){
    const schema= new Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(50).required().email(),
        birthday:Joi.date()
    });
    return schema.validate(user);
}
const User = mongoose.model("User",userSchema);
module.exports={User,validateRegister};