import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Singup from "./auth/Singup";
import Mainhome from "./pages/home/Mainhome";

import AdminLayout from "./dashboard/admin/layout/AdminLayout";
import Dashboard from "./dashboard/admin/pages/Dashboard";
import CardForm from "./dashboard/admin/pages/CardFrom";
import CardList from "./dashboard/admin/pages/CardList";
import CategoryList from "./dashboard/admin/pages/CategoryList";
import Profile from "./dashboard/admin/pages/Profile";
import Settings from "./dashboard/admin/pages/Settings";
import Product from "./dashboard/admin/pages/Product";
import Orders from "./dashboard/admin/pages/Order";
import AddProduct from "./dashboard/admin/pages/AddProduct";
import Products from "./dashboard/admin/pages/Product";
import AddCategory from "./dashboard/admin/pages/AddCategory";

function App() {
  return (
    <Routes>

      {/* User Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Mainhome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Singup />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AdminLayout />
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/admin/categories/add" element={<AddCategory />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
      </Route>

    </Routes>
  );
}

export default App;
