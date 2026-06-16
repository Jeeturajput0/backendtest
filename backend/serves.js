const express=require("express")
const dotenv=require("dotenv")
const app=express();
const port=3000;
const mongoosedb=require("./config/db");
mongoosedb();
app.use(express.json());
const auth=require("./routes/userRoutes")
const card=require("./routes/cardRoute")
    
app.use("/user",auth)
app.use("/card",card)
app.listen(port,()=>{
    console.log(`server is runing http://localhost:${port}`);
    
});
