import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Signup from "./auth/Singup";
import RequireAuth from "./auth/RequireAuth";
import Mainhome from "./pages/home/Mainhome";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/home/Cart";
import ProductDetails from "./pages/home/Productdetails";
import About from "./pages/about/About";
import Checkout from "./pages/checkout/Checkout";
import MyOrders from "./pages/checkout/MyOrders";
import OrderSuccess from "./pages/checkout/OrderSuccess";
import AdminLayout from "./dashboard/admin/layout/AdminLayout";
import Dashboard from "./dashboard/admin/pages/dashboard/Dashboard";
import Products from "./dashboard/admin/pages/products/Product";
import AddProduct from "./dashboard/admin/components/AddProduct";
import Orders from "./dashboard/admin/pages/orders/Order";

import AddOrders from "./dashboard/admin/pages/orders/Addoders";
import Category from "./dashboard/admin/pages/categories/Category";
import AddCategory from "./dashboard/admin/pages/categories/AddCategory";
import Brand from "./dashboard/admin/pages/brands/Brand";
import AddBrand from "./dashboard/admin/pages/brands/AddBrand";
import Color from "./dashboard/admin/pages/colors/Color";
import AddColor from "./dashboard/admin/pages/colors/AddColors";
import Sizes from "./dashboard/admin/pages/Sizes/Size";
import AddSize from "./dashboard/admin/pages/Sizes/AddSizes";
import Coupon from "./dashboard/admin/pages/coupons/Coupon";
import AddCoupon from "./dashboard/admin/pages/coupons/AddCoupon";
import Offer from "./dashboard/admin/pages/offers/Offer";
import AddOffer from "./dashboard/admin/pages/offers/AddOffers";
import Banners from "./dashboard/admin/pages/banners/Banners";
import AddBanner from "./dashboard/admin/pages/banners/AddBanner";
import Reviews from "./dashboard/admin/pages/reviews/Reviews";
import AddReview from "./dashboard/admin/pages/reviews/AddReview";
import Payments from "./dashboard/admin/pages/Payments/Payments";
import AddPayment from "./dashboard/admin/pages/Payments/Addpayments";
import Profile from "./dashboard/admin/pages/profile/Profile";
import Settings from "./dashboard/admin/pages/settings/Setting";
import Users from "./dashboard/admin/pages/users/Users";
import OrderDetails from "./dashboard/admin/pages/orders/Orderdetails";
import VendorDashboard from "./dashboard/vendor/pages/VendorDashboard";
import VendorLayout from "./dashboard/vendor/layout/VendorLayout";
import VendorProducts from "./dashboard/vendor/pages/products/VendorProducts";
import VendorProductAdd from "./dashboard/vendor/pages/products/vendorProductAdd";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* vendor */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboard />} />
        <Route path="products" element={<VendorProducts />} />
        <Route path="products/add" element={<VendorProductAdd />} />
      </Route>

      {/* home page */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Mainhome />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="product/:product_id" element={<ProductDetails />} />
      </Route>
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:product_id" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/add" element={<AddOrders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="categories" element={<Category />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/edit/:category_id" element={<AddCategory />} />
        <Route path="brand" element={<Brand />} />
        <Route path="brand/add" element={<AddBrand />} />
        <Route path="brand/edit/:brand_id" element={<AddBrand />} />
        <Route path="colors" element={<Color />} />
        <Route path="colors/add" element={<AddColor />} />
        <Route path="sizes" element={<Sizes />} />
        <Route path="sizes/add" element={<AddSize />} />
        <Route path="sizes/edit/:sizes_id" element={<AddSize />} />
        <Route path="coupons" element={<Coupon />} />
        <Route path="coupons/add" element={<AddCoupon />} />
        <Route path="coupons/edit/:coupon_id" element={<AddCoupon />} />
        <Route path="offers" element={<Offer />} />
        <Route path="offers/add" element={<AddOffer />} />
        <Route path="offers/edit/:offer_id" element={<AddOffer />} />
        <Route path="banners" element={<Banners />} />
        <Route path="banners/add" element={<AddBanner />} />
        <Route path="banners/edit/:id" element={<AddBanner />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reviews/add" element={<AddReview />} />
        <Route path="payments" element={<Payments />} />
        <Route path="payments/add" element={<AddPayment />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
      </Route>
      {/* <Route
        path="*"
        element={
          <Navigate
            to={localStorage.getItem("token") ? "/admin" : "/login"}
            replace
          />
        }
      /> */}
    </Routes>
  );
}
