import "./App.css";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import VendorOrders from "./dashboard/vendor/pages/order/Vendororder";

const Layout = lazy(() => import("./components/layout/Layout"));
const Login = lazy(() => import("./auth/Login"));
const Signup = lazy(() => import("./auth/Singup"));
const RequireAdmin = lazy(() => import("./auth/RequireAdmin"));
const AdminLogin = lazy(() => import("./auth/AdminLogin"));
const Mainhome = lazy(() => import("./pages/home/Mainhome"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const Cart = lazy(() => import("./pages/home/Cart"));
const ProductDetails = lazy(() => import("./pages/home/ProductDetails"));
const About = lazy(() => import("./pages/about/About"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const MyOrders = lazy(() => import("./pages/checkout/MyOrders"));
const OrderSuccess = lazy(() => import("./pages/checkout/OrderSuccess"));
const AdminLayout = lazy(() => import("./dashboard/admin/layout/AdminLayout"));
const Dashboard = lazy(() => import("./dashboard/admin/pages/dashboard/Dashboard"));
const Products = lazy(() => import("./dashboard/admin/pages/products/Product"));
const AddProduct = lazy(() => import("./dashboard/admin/components/AddProduct"));
const Orders = lazy(() => import("./dashboard/admin/pages/orders/Order"));
const AddOrders = lazy(() => import("./dashboard/admin/pages/orders/Addoders"));
const Category = lazy(() => import("./dashboard/admin/pages/categories/Category"));
const AddCategory = lazy(() => import("./dashboard/admin/pages/categories/AddCategory"));
const Brand = lazy(() => import("./dashboard/admin/pages/brands/Brand"));
const AddBrand = lazy(() => import("./dashboard/admin/pages/brands/AddBrand"));
const Color = lazy(() => import("./dashboard/admin/pages/colors/Color"));
const AddColor = lazy(() => import("./dashboard/admin/pages/colors/AddColors"));
const Sizes = lazy(() => import("./dashboard/admin/pages/Sizes/Size"));
const AddSize = lazy(() => import("./dashboard/admin/pages/Sizes/AddSizes"));
const Coupon = lazy(() => import("./dashboard/admin/pages/coupons/Coupon"));
const AddCoupon = lazy(() => import("./dashboard/admin/pages/coupons/AddCoupon"));
const Offer = lazy(() => import("./dashboard/admin/pages/offers/Offer"));
const AddOffer = lazy(() => import("./dashboard/admin/pages/offers/AddOffers"));
const Banners = lazy(() => import("./dashboard/admin/pages/banners/Banners"));
const AddBanner = lazy(() => import("./dashboard/admin/pages/banners/AddBanner"));
const Reviews = lazy(() => import("./dashboard/admin/pages/reviews/Reviews"));
const AddReview = lazy(() => import("./dashboard/admin/pages/reviews/AddReview"));
const Payments = lazy(() => import("./dashboard/admin/pages/Payments/Payments"));
const AddPayment = lazy(() => import("./dashboard/admin/pages/Payments/Addpayments"));
const Profile = lazy(() => import("./dashboard/admin/pages/profile/Profile"));
const Settings = lazy(() => import("./dashboard/admin/pages/settings/Setting"));
const Users = lazy(() => import("./dashboard/admin/pages/users/Users"));
const OrderDetails = lazy(() => import("./dashboard/admin/pages/orders/Orderdetails"));
const VendorDashboard = lazy(() => import("./dashboard/vendor/pages/VendorDashboard"));
const VendorLayout = lazy(() => import("./dashboard/vendor/layout/VendorLayout"));
const VendorProducts = lazy(() => import("./dashboard/vendor/pages/products/VendorProducts"));
const VendorProductAdd = lazy(() => import("./dashboard/vendor/pages/products/vendorProductAdd"));

const PageLoader = () => <div className="grid min-h-screen place-items-center text-sm font-medium text-slate-500">Loading page...</div>;

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}><Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* vendor */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboard />} />
        <Route path="products" element={<VendorProducts />} />
        <Route path="products/add" element={<VendorProductAdd />} />
        <Route path="products/edit/:product_id" element={<VendorProductAdd />} />
          <Route
    path="orders"
    element={<VendorOrders />}
  />
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
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
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
    </Routes></Suspense>
  );
}
