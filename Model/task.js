const mongoose= require('mongoose');

const userschema=  mongoose.Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
isCompleted:{
    type:Boolean,
    default:false,
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:'user'
},
createdAt:{
    type:Date,
    default: Date.now(),
}
});

module.exports=  mongoose.model("Task", userschema );