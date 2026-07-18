import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Singup from "./auth/Singup";
import Mainhome from "./pages/home/Mainhome";

import AdminLayout from "./dashboard/admin/layout/AdminLayout";
import Dashboard from "./dashboard/admin/pages/Dashboard";
import Product from "./dashboard/admin/pages/Product";
import Orders from "./dashboard/admin/pages/Order";
import Products from "./dashboard/admin/pages/Product";
import AddCategory from "./dashboard/admin/pages/AddCategory";
import AddProduct from "./dashboard/admin/pages/AddProduct";
import Coupon from "./dashboard/admin/pages/Coupon";
import AddCoupon from "./dashboard/admin/pages/AddCoupon";
import Offer from "./dashboard/admin/pages/Offer";
import AddOffer from "./dashboard/admin/pages/AddOffers";
import Shop from "./pages/home/Shop";
import Brand from "./dashboard/admin/pages/Brand";
import AddBrand from "./dashboard/admin/pages/AddBrand";
import Category from "./dashboard/admin/pages/Category";
import Color from "./dashboard/admin/pages/color";
import AddColor from "./dashboard/admin/pages/AddColors";
import AddSize from "./dashboard/admin/pages/Sizes/AddSizes";
import Sizes from "./dashboard/admin/pages/Sizes/Size";
import Settings from "./dashboard/admin/pages/settings/Setting";
import Users from "./dashboard/admin/pages/users/Users";
import Profile from "./dashboard/admin/pages/profile/Profile";
import Payments from "./dashboard/admin/pages/Payments/Payments";
import AddPayment from "./dashboard/admin/pages/Payments/Addpayments";
import Vendors from "./dashboard/admin/pages/vendor/Vendor";
import Reviews from "./dashboard/admin/pages/reviews/Reviews";

function App() {
  return (
    <Routes>

      {/* User Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Mainhome />} />
        <Route path="/shop" element={<Shop />} />
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
        <Route path="/admin/categories" element={<Category/>} />
        <Route path="/admin/categories/add" element={<AddCategory />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/coupons" element={<Coupon />} />
        <Route path="/admin/offers" element={<Offer />} />
        <Route path="/admin/brand" element={<Brand />} />
        <Route path="/admin/colors" element={<Color />} />
        <Route path="/admin/colors/add" element={<AddColor />} />
        
        <Route path="/admin/brand/add" element={<AddBrand />} />
        <Route path="/admin/offers/add" element={<AddOffer />} />
        <Route path="/admin/coupons/add" element={<AddCoupon />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/edit/:product_id" element={<AddProduct />} />
        <Route path="/admin/brand/edit/:brand_id" element={<AddBrand />} />
        <Route path="/admin/offers/edit/:offer_id" element={<AddOffer />} />
        <Route path="/admin/coupons/edit/:coupon_id" element={<AddCoupon />} />
        <Route path="/admin/sizes/edit/:sizes_id" element={<AddSize />} />
        <Route path="/admin/sizes" element={<Sizes />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/sizes/add" element={<AddSize />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/vendors" element={<Vendors />} />
        <Route path="/admin/reviews" element={<Reviews />} />

        <Route path="/admin/payments/add" element={<AddPayment />} />

      </Route>

    </Routes>
  );
}

export default App;
