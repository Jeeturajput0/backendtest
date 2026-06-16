const dotenv=require("dotenv")
dotenv.config();
const mongoose = require("mongoose")

const connectbd = async ()=>{
try{
   await mongoose.connect(process.env.MONGO_URI)
    console.log("mongoose are connect")
}catch(err){
    console.log("mongoose are failed",err);
    
}
}
module.exports=connectbd;