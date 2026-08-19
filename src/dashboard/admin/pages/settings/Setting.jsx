import { useEffect, useState } from "react";
import { KeyRound, Mail, Save, ShieldCheck } from "lucide-react";
import api from "../../../../services/api";

export default function Settings() {
  const [form, setForm] = useState({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setForm((current) => ({ ...current, email: user?.email || "" }));
  }, []);

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }
    setSaving(true);
    try {
      const { data } = await api.put("/admin/account", {
        email: form.email,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword || undefined,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userdetails", JSON.stringify(data.user));
      setForm((current) => ({ ...current, email: data.user.email, currentPassword: "", newPassword: "", confirmPassword: "" }));
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Credentials could not be updated.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow sm:p-8">
        <div className="mb-8 flex items-start gap-4">
          <div className="rounded-xl bg-indigo-100 p-3 text-indigo-700"><ShieldCheck /></div>
          <div><h1 className="text-2xl font-bold text-slate-800">Admin security</h1><p className="mt-1 text-sm text-slate-500">Change the email or password used at <code>/admin/login</code>.</p></div>
        </div>
        <form onSubmit={submit} className="space-y-6">
          <label className="block"><span className="mb-2 flex items-center gap-2 font-medium text-slate-700"><Mail size={17} /> Admin email</span><input required type="email" name="email" value={form.email} onChange={change} className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></label>
          <label className="block"><span className="mb-2 flex items-center gap-2 font-medium text-slate-700"><KeyRound size={17} /> Current password</span><input required type="password" name="currentPassword" value={form.currentPassword} onChange={change} className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block"><span className="mb-2 block font-medium text-slate-700">New password <small className="font-normal text-slate-500">(optional)</small></span><input minLength="8" type="password" name="newPassword" value={form.newPassword} onChange={change} className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></label>
            <label className="block"><span className="mb-2 block font-medium text-slate-700">Confirm new password</span><input type="password" name="confirmPassword" value={form.confirmPassword} onChange={change} className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></label>
          </div>
          <p className="text-xs text-slate-500">Enter your current password to confirm every change. New passwords need at least 8 characters.</p>
          {message && <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{message}</p>}
          <button disabled={saving} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"><Save size={18} />{saving ? "Saving..." : "Save credentials"}</button>
        </form>
      </div>
    </div>
  );
}
