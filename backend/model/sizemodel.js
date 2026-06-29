const mongoose =require("mongoose")
const sizeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
    },description:{
        type:String,
        maxlenght:10
    }
})
const size= mongoose.model("size",sizeSchema)
module.exports=size

