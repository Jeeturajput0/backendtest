import React from 'react'
import Authform from './Authform'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate= useNavigate();
  return (
    
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
< Authform type="Login"/>
<p>Don't have account to <button onClick={()=>navigate("/signup")} className='text-blue-300'>Click me!</button> </p>
        
      </div>
    </div> 
    
  )
}

export default Login
