const {Schema,mongoose}= require("mongoose");
const Joi = require("joi");
const commentSchema=mongoose.Schema({
    text:String,
    username:String,
    date:{
        type:Date,
        default:Date.now
    },
    user:{type:Schema.Types.ObjectId,ref:"User"}
});

const tweetSchema=mongoose.Schema({
    owner:{type:Schema.Types.ObjectId,ref:"User"},
    content:String,
    photo:String,
    video:String,
    likes:
        [{type:Schema.Types.ObjectId,ref:"User"}]
   
    ,
    bookmarked:
        [{type:Schema.Types.ObjectId,ref:"User"}]
        
    ,
    rt:
       [{type:Schema.Types.ObjectId,ref:"User"}]
      
    ,
    replies:[
        {
            userId:{type:Schema.Types.ObjectId,ref:"User"},
            content:String
        }
    ],
    comments:[commentSchema]

    

},{timestamps:true});
const Tweet = mongoose.model("Tweet",tweetSchema);
const Comment = mongoose.model("Comment",commentSchema);
module.exports= {Tweet,Comment};