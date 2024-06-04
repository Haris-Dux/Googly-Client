import { useEffect, useState } from "react";
import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { userSessionAsync } from "./features/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "loaders.css/loaders.min.css";
import "./Loader.scss";
import { Toaster } from "react-hot-toast";
const HomePage = React.lazy(() => import("./pages/home/HomePage"));
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Header from "./NormalComponnets/Header";
import Footer from "./NormalComponnets/Footer";
import Cart from "./pages/cart/Cart";
import NotFound from "./NormalComponnets/NotFound";
import Checkout from "./pages/checkout/Checkout";
import MyOrders from "./pages/order/MyOrders";
const Shop = React.lazy(() => import("./pages/shop/Shop"));
const SelectedItem = React.lazy(() =>
  import("./pages/selectedItem/SelectedItem")
);

const Signup = React.lazy(() => import("./auth/Signup"));
const Login = React.lazy(() => import("./auth/Login"));
import ForgetPass from "./auth/ForgetPass";
import OtpChecker from "./auth/OtpChecker";
import ResetPass from "./auth/ResetPass";
import UserProfile from "./pages/userProfile/UserProfile";
// OTHERS ROUTES
import PrivacyPolicy from "./NormalComponnets/PrivacyPolicy";
import Terms from "./NormalComponnets/Terms";
import Blogs from "./pages/blog/Blogs";
import { FaArrowUp } from "react-icons/fa6";
import Blog2 from "./pages/blog/Blog2";
import Blog3 from "./pages/blog/Blog3";
const OrderSuccessPage = React.lazy(() =>
  import("./pages/checkout/OrderSuccessPage")
);
import Loader from "./NormalComponnets/Loader";

function App() {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(userSessionAsync());
  });

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          {/* ---------- MAIN ROUTES ---------- */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route
            path="/shop"
            element={
              <Suspense fallback={<Loader />}>
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="/selectedItem/:id"
            element={
              <Suspense fallback={<Loader />}>
                <SelectedItem />
              </Suspense>
            }
          />
          <Route
            path="//order-success"
            element={
              <Suspense fallback={<Loader />}>
                <OrderSuccessPage />
              </Suspense>
            }
          />

          {/* ---------- AUTH ROUTES ---------- */}
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loader />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route path="/forget" element={<ForgetPass />} />
          <Route path="/otp/:id" element={<OtpChecker />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/reset/:id/:value" element={<ResetPass />} />

          {/* ---------- OTHER ROUTES ---------- */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog2" element={<Blog2 />} />
          <Route path="/blog3" element={<Blog3 />} />
        </Routes>

        {showButton && (
          <button
            onClick={handleTop}
            className="moveTop rounded-full px-3 py-3 bg-[#252525]"
          >
            <FaArrowUp size={21} className="text-white" />
          </button>
        )}

        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
