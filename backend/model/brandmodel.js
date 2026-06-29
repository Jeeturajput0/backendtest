const mongoose =require("mongoose")
const brandSchema=new mongoose.Schema({
    name:{
        type:Stirng,
        required:true,
        unique:true,
        uppercase:true
    },description:{
        type:Stirng,
        maxlength:500
    },
    isActive:{
        type:Boolean,
        default:true
    }
})
const brand= mongoose.model("brand",brandSchema)
module.exports=brand