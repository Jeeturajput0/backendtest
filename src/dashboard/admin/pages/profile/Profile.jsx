import { useEffect, useState } from "react";
import { Camera, Save, User } from "lucide-react";
import { API_URI } from "../../../../config";

const emptyProfile = {
  name: "",
  email: "",
  mobile: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  bio: "",
  avatar: "",
};
const requestHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default function Profile() {
  const [form, setForm] = useState(emptyProfile);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch(`${API_URI}/admin/profile`, { headers: requestHeaders() })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setForm((current) => ({ ...current, ...data.data }));
        else setMessage(data.message);
      })
      .catch(() => setMessage("Profile could not be loaded"));
  }, []);
  const submit = async (event) => {
    event.preventDefault();
    const res = await fetch(`${API_URI}/admin/profile`, {
      method: "PUT",
      headers: requestHeaders(),
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
    if (data.success) {
      setForm((current) => ({ ...current, ...data.data }));
      window.dispatchEvent(new Event("profile-updated"));
    }
  };
  const change = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const avatar =
    form.avatar ||
    `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(form.name || "Admin")}`;
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="relative h-40 bg-blue-600">
          <img
            src={avatar}
            alt="Profile"
            className="absolute left-8 top-20 h-32 w-32 rounded-full border-4 border-white object-cover"
          />
          <Camera
            className="absolute left-32 top-44 rounded-full bg-blue-600 p-2 text-white"
            size={34}
          />
        </div>
        <form onSubmit={submit} className="mt-16 p-8">
          <div className="mb-8 flex items-center gap-3">
            <User className="text-blue-600" />
            <h2 className="text-2xl font-bold">My Profile</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["name", "Full Name", "text"],
              ["email", "Email", "email"],
              ["mobile", "Phone", "text"],
              ["address", "Address", "text"],
              ["city", "City", "text"],
              ["state", "State", "text"],
              ["country", "Country", "text"],
              ["avatar", "Avatar URL", "url"],
            ].map(([name, label, type]) => (
              <label key={name} className="block">
                <span className="mb-2 block font-medium">{label}</span>
                <input
                  name={name}
                  type={type}
                  value={form[name] || ""}
                  disabled={name === "email"}
                  onChange={change}
                  className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="mb-2 block font-medium">Bio</span>
              <textarea
                rows="4"
                name="bio"
                value={form.bio || ""}
                onChange={change}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          {message && <p className="mt-5 text-sm text-blue-700">{message}</p>}
          <div className="mt-8 flex justify-end">
            <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              <Save size={18} />
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
