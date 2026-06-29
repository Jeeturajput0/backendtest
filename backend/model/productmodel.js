const mongoose =require("mongoose")
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true

    },
    brand:{
        type:String,
        required:true

    },
      size:{
        type:String,
        required:true

    },
      color:{
        type:String,
        required:true

    },
     mrp:{
        type:Number,
        required:true
    }, 
    saleprice:{
        type:Number,
        required:true

    },

})
const product= mongoose.model("product",ProductSchema)
module.exports =product