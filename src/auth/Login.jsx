
import React, { useState } from "react";
import Authform from "./Authform";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate =useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        formData
      );

      localStorage.setItem(
        "userdetails",
        JSON.stringify(res.data)
      );

      Swal.fire({
        title: "SUCCESS",
        text: "Login Successfully",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "ERROR",
        text: "Invalid Credentials",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <Authform
          type="login"
          formData={formData}
          handleChange={handleChange}
          handlesubmit={handleSubmit}
        />
      <p>Don't have account to <button onClick={()=>Navigate("/signup")} className='text-blue-300'>Click me!</button> </p>
      </div>
    </div>
  );
};

export default Login;