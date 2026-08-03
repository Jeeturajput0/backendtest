
import React, { useEffect, useState } from "react";
import Authform from "./Authform";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, ShoppingBag } from "lucide-react";
import { API_URI } from "../config";

const Login = () => {
 

  const navigate =useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"customer"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 useEffect(() => {

   const token = localStorage.getItem("token");
   const role = localStorage.getItem("role");

   if (!token) return;

   if (role === "admin") {
      navigate("/admin");
   } else if (role === "vendor") {
      navigate("/vendor");
   } else {
      navigate("/");
   }

}, [navigate]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${API_URI}/user/login`,
      formData
    );

    console.log(res.data);

    // Token Save
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userdetails", JSON.stringify(res.data.data));
    localStorage.setItem("role", res.data.data.role);

    Swal.fire({
      title: "SUCCESS",
      text: "Login Successfully",
      icon: "success",
    });

    const role= res.data.data.role;

    if(role=== "admin" ){
      navigate("/admin")
      }else if(role === "vendor"){
        navigate("/vendor")
      }else{
        navigate("/")
      }
  } catch (error) {
    Swal.fire({
      title: "ERROR",
      text: error.response?.data?.message || "Invalid Credentials",
      icon: "error",
    });
  }
};

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.35),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,.2),transparent_28%)]" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-8"><div className="mb-5 inline-flex rounded-2xl bg-indigo-600 p-3 text-white"><ShoppingBag size={23}/></div><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Welcome back</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight">Sign in to ShopEase</h1><p className="mt-2 text-sm text-slate-500">Manage your store and pick up where you left off.</p></div>
        <Authform
          type="login"
          formData={formData}
          handleChange={handleChange}
          handlesubmit={handleSubmit}
        />
      <p className="mt-6 text-center text-sm text-slate-500">New here? <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-800">Create an account <ArrowRight className="inline" size={14}/></Link></p>
      </div>
    </div>
  );
};

export default Login;
