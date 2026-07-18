import React, { useState } from "react";
import {
  User,
  Store,
  Globe,
  Shield,
  Bell,
  Palette,
  Save,
  Upload,
} from "lucide-react";

const Settings = () => {
  const [form, setForm] = useState({
    adminName: "Admin",
    adminEmail: "admin@example.com",
    phone: "+91 9876543210",

    storeName: "My Store",
    storeEmail: "store@example.com",
    storePhone: "+91 9876543210",
    address: "Agra, Uttar Pradesh",

    currency: "INR",
    language: "English",
    timezone: "Asia/Kolkata",

    darkMode: false,
    maintenance: false,
    emailNotification: true,
    smsNotification: false,

    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Settings
          </h1>
          <p className="text-slate-500">
            Manage your dashboard settings
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>

      <form className="space-y-8">
        {/* ================= Profile ================= */}

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              Admin Profile
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <img
                src="https://ui-avatars.com/api/?name=Admin"
                className="w-32 h-32 rounded-full border"
                alt=""
              />

              <button
                type="button"
                className="mt-4 flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg"
              >
                <Upload size={16} />
                Upload Image
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5 flex-1">
              <div>
                <label className="font-medium">Admin Name</label>

                <input
                  type="text"
                  name="adminName"
                  value={form.adminName}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-medium">Email</label>

                <input
                  type="email"
                  name="adminEmail"
                  value={form.adminEmail}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-medium">Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= Store ================= */}

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Store className="text-green-600" />
            <h2 className="text-xl font-semibold">
              Store Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label>Store Name</label>

              <input
                type="text"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label>Store Email</label>

              <input
                type="email"
                name="storeEmail"
                value={form.storeEmail}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label>Store Phone</label>

              <input
                type="text"
                name="storePhone"
                value={form.storePhone}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label>Address</label>

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>
          </div>
        </div>

        {/* ================= Website ================= */}

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-purple-600" />
            <h2 className="text-xl font-semibold">
              Website Settings
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label>Currency</label>

              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>

            <div>
              <label>Language</label>

              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              >
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>

            <div>
              <label>Timezone</label>

              <select
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              >
                <option>Asia/Kolkata</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= Security ================= */}

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-red-500" />
            <h2 className="text-xl font-semibold">
              Change Password
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <input
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />
          </div>
        </div>

        {/* ================= Preferences ================= */}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="text-yellow-500" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>

            <label className="flex items-center justify-between py-3">
              <span>Dark Mode</span>

              <input
                type="checkbox"
                name="darkMode"
                checked={form.darkMode}
                onChange={handleChange}
                className="w-5 h-5"
              />
            </label>

            <label className="flex items-center justify-between py-3">
              <span>Maintenance Mode</span>

              <input
                type="checkbox"
                name="maintenance"
                checked={form.maintenance}
                onChange={handleChange}
                className="w-5 h-5"
              />
            </label>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-orange-500" />
              <h2 className="text-xl font-semibold">
                Notifications
              </h2>
            </div>

            <label className="flex items-center justify-between py-3">
              <span>Email Notifications</span>

              <input
                type="checkbox"
                name="emailNotification"
                checked={form.emailNotification}
                onChange={handleChange}
                className="w-5 h-5"
              />
            </label>

            <label className="flex items-center justify-between py-3">
              <span>SMS Notifications</span>

              <input
                type="checkbox"
                name="smsNotification"
                checked={form.smsNotification}
                onChange={handleChange}
                className="w-5 h-5"
              />
            </label>
          </div>
        </div>

        {/* Bottom Button */}

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;