const mongoose =require("mongoose")
const colorSchema=new mongoose.Schema({
    name:{
        type:Stirng,
        required:true,
        unique:true,
        uppercase:true
    },code:{
        type:Stirng,
        required:true
    }
})
const color= mongoose.model("color",colorSchema)
module.exports=color