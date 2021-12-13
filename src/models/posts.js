const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:String,
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    tags:String,
    image:{
        type:Buffer,
        required:true
    },
    likes:{
        type:[String],
        default:[]
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})

const Post = new mongoose.model("Post",postSchema)

module.exports=Post