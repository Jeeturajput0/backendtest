import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Authform from "./Authform";
import { API_URI } from "../config";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (localStorage.getItem("token") && user?.role === "admin") navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${API_URI}/user/admin/login`, formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userdetails", JSON.stringify(data.user));
      await Swal.fire({ title: "Welcome, Admin", text: "Login successful", icon: "success" });
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      Swal.fire({ title: "Login failed", text: error.response?.data?.message || "Invalid admin credentials", icon: "error" });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,.35),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(124,58,237,.25),transparent_30%)]" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-8">
          <div className="mb-5 inline-flex rounded-2xl bg-indigo-600 p-3 text-white"><ShieldCheck size={24} /></div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Restricted access</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Admin login</h1>
          <p className="mt-2 text-sm text-slate-500">Use your administrator email and password to open the dashboard.</p>
        </div>
        <Authform type="login" formData={formData} handleChange={(event) => setFormData((value) => ({ ...value, [event.target.name]: event.target.value }))} handlesubmit={handleSubmit} />
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500"><LockKeyhole size={14} /> Admin-only access</p>
      </div>
    </div>
  );
}
