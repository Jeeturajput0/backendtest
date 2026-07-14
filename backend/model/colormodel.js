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
const Color= mongoose.model("Color",colorSchema)
module.exports=Color