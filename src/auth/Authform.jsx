import { Lock, Mail, Phone, User, ChevronDown } from "lucide-react";

const Authform = ({ type, handlesubmit, formData, handleChange }) => (
  <form onSubmit={handlesubmit} className="space-y-5">

    {/* Register Only Fields */}
    {type === "register" && (
      <>
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Mobile Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="+91 9876543210"
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Role - Register Only */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Account Type
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              name="role"
              value={formData.role || "customer"}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-11 text-sm font-medium text-slate-700 outline-none transition-all hover:border-indigo-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Select the type of account you want to create.
          </p>
        </div>
      </>
    )}

    {/* Email */}
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Email Address
      </label>

      <div className="relative">
        <Mail
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
          required
          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>
    </div>

    {/* Password */}
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Password
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          required
          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 py-3 font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
    >
      {type === "register" ? "Create Account" : "Login"}
    </button>
  </form>
);

export default Authform;