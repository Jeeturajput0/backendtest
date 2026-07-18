import React, { useState } from "react";
import { User, Camera, Save } from "lucide-react";

const Profile = () => {
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street",
    city: "Agra",
    state: "Uttar Pradesh",
    country: "India",
    bio: "Administrator of the dashboard.",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 h-40 relative">
          <div className="absolute left-8 top-20">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />

              <button
                type="button"
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white"
              >
                <Camera size={18} />
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 mt-16">
          <div className="flex items-center gap-3 mb-8">
            <User className="text-blue-600" />
            <h2 className="text-2xl font-bold">My Profile</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                City
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                State
              </label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Bio
              </label>
              <textarea
                rows="4"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              <Save size={18} />
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;