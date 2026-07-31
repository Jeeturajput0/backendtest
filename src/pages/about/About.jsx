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
                 <button onClick={()=>incerement()}   className="inline-flex rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                  >+</button>
                <p>{count}</p>
                <button onClick={()=>decrement()}  className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                 >-</button>
            </div>
        </>
    )
}

export default About