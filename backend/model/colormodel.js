const mongoose =require("mongoose")
const colorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase:true
    },code:{
        type:String,
        required:true
    }
    ,
    isActive:{
        type:Boolean,
        required:true
    }
})
const Color= mongoose.model("Color",colorSchema)
module.exports=Color