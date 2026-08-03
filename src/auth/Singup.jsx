import React, { useState } from "react";
import Authform from "./Authform";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { API_URI } from "../config";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URI}/user/register`, formData);

      localStorage.setItem("userdetails", JSON.stringify(res.data));

      Swal.fire({
        title: "SUCCESS",
        text: "Registered Successfully",
        icon: "success",
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "ERROR",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,.35),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(16,185,129,.2),transparent_28%)]" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-8">
          <div className="mb-5 inline-flex rounded-2xl bg-violet-600 p-3 text-white">
            <Sparkles size={23} />
          </div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-violet-600">
            Create your account
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Start something good.
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join ShopEase and make every purchase feel effortless.
          </p>
        </div>
        <Authform
          type="register"
          formData={formData}
          handleChange={handleChange}
          handlesubmit={handlesubmit}
        />
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Sign in <ArrowRight className="inline" size={14} />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
