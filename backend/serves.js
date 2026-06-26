const express=require("express")
const dotenv=require("dotenv")
dotenv.config();
const app=express();
const port=3000;
const mongoosedb=require("./config/db");
mongoosedb();
app.use(express.json());
const auth=require("./routes/auth.routes")
const category =require("./routes/protected.route")

app.use("/api/user",auth)
app.use("/api/category",category)
app.listen(port,()=>{
    console.log(`server is runing http://localhost:${port}`);
    
});
