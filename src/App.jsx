import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Singup from "./auth/Singup";
import Mainhome from "./pages/home/Mainhome";

import AdminLayout from "./dashboard/admin/layout/AdminLayout";
import Dashboard from "./dashboard/admin/pages/Dashboard";
import Overview from "./dashboard/admin/pages/Overview";
import CardForm from "./dashboard/admin/pages/CardFrom";
import CardList from "./dashboard/admin/pages/CardList";
import CategoryForm from "./dashboard/admin/pages/CategoryFrom";
import CategoryList from "./dashboard/admin/pages/CategoryList";
import Profile from "./dashboard/admin/pages/Profile";
import Settings from "./dashboard/admin/pages/Settings";

function App() {
  return (
    <Routes>

      {/* User Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Mainhome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Singup />} />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/overview" element={<Overview />} />
        <Route path="/admin/category-form" element={<CategoryForm />} />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/admin/card-form" element={<CardForm />} />
        <Route path="/admin/card-list" element={<CardList />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}

export default App;