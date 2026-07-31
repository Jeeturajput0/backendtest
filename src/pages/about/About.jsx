import React, { useState } from "react";
const About=()=>{
const [count,setCount]=useState(0)
const incerement=()=>{
setCount(count+1);

}
const decrement=()=>{
   setCount(count-1);
}
    return(
        <>
            <div>
                <button onClick={()=>incerement()}>+</button>
                <p>{count}</p>
                <button onClick={()=>decrement()}>-</button>
            </div>
        </>
    )
}

export default About