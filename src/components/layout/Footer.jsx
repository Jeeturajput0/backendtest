import React from 'react'
import { Link } from 'react-router-dom'
function Footer(){
    return(
     <>
     <div className='flex h-5'>
        <div><h1>colume</h1></div>
        <div><h1>colume</h1></div>
        <div><h1>colume</h1></div>
        <div><h1>colume</h1></div>
       <Link to="/admin">go to admin dashboard </Link>
     </div>
     </>   
    )
}
export default Footer