import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Singup from "./auth/Singup";
import Mainhome from "./pages/home/Mainhome";

// import AdminLayout from "./dashboard/admin/layout/AdminLayout";
// import Dashboard from "./dashboard/admin/pages/Dashboard";
// import Overview from "./dashboard/admin/pages/Overview";
// import CardForm from "./dashboard/admin/pages/CardFrom";
// import CardList from "./dashboard/admin/pages/CardList";
// import CategoryForm from "./dashboard/admin/pages/CategoryFrom";
// import CategoryList from "./dashboard/admin/pages/CategoryList";
// import Profile from "./dashboard/admin/pages/Profile";
// import Settings from "./dashboard/admin/pages/Settings";

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
      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="overview" element={<Overview />} />
        <Route path="category-form" element={<CategoryForm />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="card-form" element={<CardForm />} />
        <Route path="card-list" element={<CardList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route> */}

    </Routes>
  );
}

export default App;