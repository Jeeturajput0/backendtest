const express=require("express")
const dotenv=require("dotenv")
const app=express();
const port=3000;
const mongoosedb=require("./config/db");
mongoosedb();
app.use(express.json());
const auth=require("./routes/userRoutes")
const card=require("./routes/cardRoute")
const category=require("./routes/categoryRoute")
    
app.use("/api/user",auth)
app.use("/api/card",card)
app.use("/api/category",category)
app.listen(port,()=>{
    console.log(`server is runing http://localhost:${port}`);
    
});
