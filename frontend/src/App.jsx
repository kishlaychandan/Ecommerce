import { createContext, useEffect, useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./axiosConfig";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleProduct from "./pages/Singleproduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "./components/Login/Admin/AddProduct/AddProduct";
import AdminLogin from "./components/Login/Admin/AdminLogin";
import AdminDashboard from "./components/Login/Admin/AdminDashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import EditAbout from "./components/EditAbout";
import Faq from "./pages/Faq";
import EditFaq from "./components/EditFaq";
import { ThemeProvider } from "./ThemeContext";

import { CartProvider } from "./CartContext";
import Checkout from "./pages/Checkout";
import AdminCoupon from "./components/AdminCoupon";
import EditReview from "./components/Login/Admin/EditReview";
import RegisteredUsers from "./components/Login/Admin/RegisteredUsers";
import Orders from "./pages/Orders";
import AdminOrders from "./components/AdminOrders";
import AdminProtectedRoute from "./AdminProtectedRoute";
import SalesChart from "./components/Login/Admin/SalesChart";
import Shop from "./pages/Shop";
import { MdOutlineRotateRight } from "react-icons/md";

export const userContext = createContext();
export const adminContext = createContext();
export const cartContext = createContext();

async function fetchData() {
  try {
    const response = await axios.get("/check/me", { validateStatus: false });
    // console.log("response", response);
    return response.status === 200 && response.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchAdminData() {
  try {
    const response = await axios.get("/check/admin", { validateStatus: false });
    // console.log("response", response);
    return response.status === 200 && response.data;
  } catch (error) {
    console.log(error.message);
  }
}

function App() {
  const [isUserLoggedIn, setIsUserLoggedin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  // const [cart, setCart] = useState([]);
  // const [wishlist, setWishlist] = useState([]);
  
  useEffect(() => {
    async function checkAuthStatus() {
      const response = await fetchData();
      if (response) {
        // console.log("inside response");

        setIsUserLoggedin(true);
      }
      setLoading(false);
    }

    async function checkAdminAuthStatus() {
      const response = await fetchAdminData();
      if (response) {
        // console.log("inside response");

        setIsAdminLoggedIn(true);
      }
      setLoading(false);
    }

    checkAdminAuthStatus();
    checkAuthStatus();
  }, []);
  

  // function addToWishlist(productToAdd) {
  //   setWishlist([...wishlist, productToAdd]);
  // }

  // function addToCart(productToAdd) {
  //   setCart([...cart, productToAdd]);
  // }

  // Show loading message while checking authentication
  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center p-5 text-center">
          <div className="animate-spin mb-4">
            <MdOutlineRotateRight size={72} style={{ color: "blue" ,  }} />
          </div>
          <p>
            Loading... Please wait. The Render site might take some time to
            restart if left inactive for a while.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
    <BrowserRouter>
      <ThemeProvider>
        <userContext.Provider
          value={{
            isUserLoggedIn,
            setIsUserLoggedin,
            isAdminLoggedIn,
            setIsAdminLoggedIn,
          }}
        >
          {/* <cartContext.Provider
          value={{
            cart,
            setCart,
            wishlist,
            setWishlist,
            addToCart,
            addToWishlist,
          }}
        > */}
          <CartProvider>
            {!isAdminLoggedIn && <Header />}
            <Routes>
              <Route path="/s" element={<SalesChart />} />
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/ao" element={<AdminOrders />} />
              <Route path="/order" element={<Orders />} />
              {/* <Route path="/admin/editabout" element={<EditAbout />} /> */}
              {/* <Route path="/admin/editfaq" element={<EditFaq />} /> */}
              {/* <Route path="/AdminCoupon" element={<AdminCoupon />} />
            <Route path="/editreview" element={<EditReview />} />
            <Route path="/reg" element={<RegisteredUsers />} /> */}
              {/* <Route path="/addproduct" element={<AddProduct />} /> */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin" element={<AdminLogin />} />
              {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
            </Routes>
            {!isAdminLoggedIn && <Footer />}
            {/* </cartContext.Provider> */}
          </CartProvider>
        </userContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
