import { Lock, Mail, Phone, User } from "lucide-react";

const Authform = ({ type, handlesubmit, formData, handleChange }) => (
  <form onSubmit={handlesubmit} className="space-y-5">
    {type === "register" && (
      <>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Mobile Number</label>
          <div className="relative">
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+91 9876543210" required className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" />
          </div>
        </div>
      </>
    )}
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
      <div className="relative">
        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" required className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" />
      </div>
    </div>
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
      <div className="relative">
        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" required className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" />
      </div>
    </div>
    <button type="submit" className="w-full rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 py-3 font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl">
      {type === "register" ? "Create Account" : "Login"}
    </button>
  </form>
);

export default Authform;
