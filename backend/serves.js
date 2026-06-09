const express=require("express")
const app=express();
const port=2000;

app.get((req,res)=>{
    console.log("hdbb");
    res.send('heelo')
    
});

// app.post((req,res)=>{
//     const {name,password}= res.app
//     console.log(name,password);
    
// })

app.listen(port,()=>{
    console.log(`server is runing http://localhost${port}`);
    
});