const jwt=require("jsonwebtoken")
const proctect = async (req,res,next)=>{
   try{
     const token = req.headers.authorization;
    next()
    res.status(400).json({
        message:"login first"
    })
   }catch(error){
    res.status(404).json({
        success:true,
        message
    }) 
   }
} 