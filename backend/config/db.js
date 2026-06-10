const mongoose = require("mongoos")
function connectbd(){
mongoose.connect("")
    .then(()=> {
        console.log("mongoose ");
    })
    .catch(()=>(
        console.log("erro")
        
    ))
}
module.exports=connectbd();