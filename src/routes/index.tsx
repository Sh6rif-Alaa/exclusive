import { Routes, Route } from "react-router-dom";
import MainLayout from "../shared/layout/MainLayout";
import { GuestRoute } from "../components/guards/GuestRoute";
import NotFound from "../pages/NotFound";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Verify from "../pages/auth/Verify";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ContactUs from "../pages/public/ContactUs";
import FAQ from "../pages/public/FAQ";
import Privacy from "../pages/public/Privacy";
import Terms from "../pages/public/Terms";
import Cart from "../pages/public/Cart";
import Wishlist from "../pages/public/Wishlist";
import Shop from "../pages/public/Shop";
import ProductDetails from "../pages/public/ProductDetails";
import { ProtectedRoute } from "../components/guards/ProtectedRoute";
import AccountLayout from "../shared/layout/AccountLayout";
import UserAccount from "../pages/protected/UserAccount";
import Orders from "../pages/protected/Orders";
import OrderDetails from "../pages/protected/OrderDetails";
import Reviews from "../pages/protected/Reviews";
import PaymentMethods from "../pages/protected/PaymentMethods";
import AddressBook from "../pages/protected/AddressBook";
import TrackOrder from "../pages/protected/TrackOrder";
import Checkout from "../pages/protected/Checkout";



export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product-details/:id" element={<ProductDetails />} />

        {/* ── Guest-only routes (redirect to / when logged in) ── */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Route>

      {/* ── Protected routes (redirect to /login when NOT logged in) ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AccountLayout />}>
          <Route path="/user-account" element={<UserAccount />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/address-book" element={<AddressBook />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
        </Route>

        <Route path="/checkout" element={<Checkout />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
