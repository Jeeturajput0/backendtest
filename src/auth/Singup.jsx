import React from 'react'
import Authform from './Authform'
import { useNavigate } from 'react-router-dom'

const Singup = () => {
  const jeetu=useNavigate();
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
< Authform type="register"/>
<p>Do You Have Account <button onClick={()=>jeetu("/login")} className='text-blue-300'>Click Me!</button></p>
        
      </div>
    </div> 
    
    </>
  )
}

export default Singup
