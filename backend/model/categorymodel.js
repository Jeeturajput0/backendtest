
const mongoose =require("mongoose")
const categorySchema = new mongoose.Schema({
title:{
    type:String,
    required:true,

},
ActiveIs:{
    type:Boolean,
    default:true
}
})
const category = mongoose.model("category",categorySchema)
module.exports=category