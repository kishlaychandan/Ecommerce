import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "../axiosConfig";
import { FaCartArrowDown, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext";
import { GiMoon } from "react-icons/gi";
import { CiLight } from "react-icons/ci";
import logo from "../assets/logo.png";
import KAMAKHYA from "../assets/KAMAKHYA.png";
import HYKI from "../assets/HYKI.png";
import BlackLogo from "../assets/BlackLogo.png";
import { useCart } from "../CartContext";
import { FaSun } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import { IoSunny } from "react-icons/io5";
import { RiSunLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import ShopNav from "./ShopNav.jsx";
import { useCategories } from "../CategoriesContext.jsx";

function Header() {
  const { cart, setCart, fetchCartAndWishlist } = useCart();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { setSearchTerm } = useCategories();
  const [searchTermState, setSearchTermState] = useState(""); // State for search input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // State for debounced search term
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const {
    isUserLoggedIn,
    setIsUserLoggedin,
    isAdminLoggedIn,
    setIsAdminLoggedIn,
  } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu
  const [open, setOpen] = useState(false);
  const isShopPage = location.pathname === "/shop";

  async function logout() {
    try {
      const response = await axios.post("/user/logout", {});
      if (response.status === 200 || response.statusText === "OK") {
        console.log("logged out");
        setIsUserLoggedin(false);
        navigate("/login");
        // fetchCartAndWishlist();
        setCart([]);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 30) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTermState);
    }, 1000); // 500ms delay

    return () => {
      clearTimeout(timer); 
    };
  }, [searchTermState]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchTerm(debouncedSearchTerm); // Trigger setSearchTerm when debouncedSearchTerm changes
    }
  }, [debouncedSearchTerm, setSearchTerm]);

  const scrollToProducts = () => {
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`z-50 sticky top-0 p-5 w-full py-3 flex items-center justify-between transition-all duration-3000 ease-in-out ${
        isDarkMode ? "" : "bg-gray-100 text-[#db7b40]"
      }
      ${scrolling ? (isDarkMode? "bg-gray-500 text-white py-6":"bg-slate-300 py-6") : (isDarkMode ? "bg-slate-500 text-white" : "bg-slate-100 ")}
      `}
    >
      {/* Left Side Logo */}
      <h1 className="max-w-[20vw] overflow-hidden">
        <Link to="/" onClick={scrollToProducts}>
          <img src={isDarkMode ? logo : logo} alt="" className={`h-12 w-full ${isDarkMode ? "" : ""} hover:transform hover:scale-105`} />
        </Link>
      </h1>

       {/* Center Section */}
       {isShopPage ? (
        // Search bar for Shop page
        <div className="flex-grow flex justify-center">
          <input
            onChange={(e) => setSearchTermState(e.target.value)}
            type="text"
            placeholder="Search for products..."
            className={`w-2/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 hidden lg:block ${isDarkMode ? " text-black" : "bg-gray-100 text-[#db7b40]"}`}
          />
        </div>
      ) : (
        // Navigation options for other pages
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/shop"
                onClick={scrollToProducts}
                className={`${
                  isActive("/shop")
                    ? "text-blue-500 underline decoration-dotted"
                    : ""
                } hover:text-sky-500 font-bold`}
              >
                SHOP
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={scrollToProducts}
                className={`${
                  isActive("/about")
                    ? "text-sky-500 underline decoration-dotted"
                    : ""
                } hover:text-sky-500 font-bold`}
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                onClick={scrollToProducts}
                className={`${
                  isActive("/faq")
                    ? "text-sky-500 underline decoration-dotted"
                    : ""
                } hover:text-sky-500 font-bold`}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={scrollToProducts}
                className={`${
                  isActive("/contact")
                    ? "text-sky-500 underline decoration-dotted"
                    : ""
                } hover:text-sky-500 font-bold`}
              >
                CONTACT US
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {/* Right Side - Cart, Wishlist, Register, Login/Logout */}
      <div className=" md:flex items-center gap-6 justify-center">
        <div className="flex list-none  items-center gap-6 justify-center">
          <li>
            <Link to="/wishlist">
            
              <FaHeart style={{ fontSize: "1.3rem" }} />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="flex items-center gap-1 relative">
              <FaCartArrowDown style={{ fontSize: "1.5rem" }} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>
          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        <ul className="hidden md:flex items-center gap-6 justify-center">
          {/* Dark and Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full transform transition-transform duration-300 ${
                isDarkMode
                  ? "translate-x-6 bg-white"
                  : "translate-x-0 bg-gray-900"
              }`}
            >
              {isDarkMode ? (
                <RiSunLine size={16} className="text-black" />
              ) : (
                <GiMoon size={16} className="text-white" />
              )}
            </div>
          </button>

          {isUserLoggedIn && (
            <li className="py-2">
              <Link to="/orders">ORDERS</Link>
            </li>
          )}
          <li>
            {isUserLoggedIn ? (
              <button onClick={logout}><CiLogout className="text-2xl" /></button>
            ) : (
              <div className="dropdown-container">
      <div className="dropdown-toggle" onClick={() => setOpen(!open)}>
        <FaUserCircle className="" style={{ fontSize: "2rem", cursor: "pointer"}} />
      </div>
      {open && (
        <div className={`dropdown-menu absolute p-1 translate-x-[-2rem] translate-y-[0.5rem] border shadow-md rounded-md ${isDarkMode?"bg-slate-900 text-white":"bg-white text-slate-900"}`}>
        <Link
          to="/login"
          className={`dropdown-item p-2 block mt-1 rounded text-center ${
            isDarkMode ? "hover:text-gray-400 hover:bg-white " : " hover:bg-gray-100 "
          }`}
        >
          LOGIN
        </Link>
        <Link
          to="/admin"
          className={`dropdown-item p-2 block mt-1 rounded text-center ${
            isDarkMode ? "hover:text-gray-400 hover:bg-white " : " hover:bg-gray-100 "
          }`}
        >
          ADMIN
        </Link>
      </div>
      
      )}
    </div>
            )}
          </li>
          {!isUserLoggedIn && (
            <li className="py-2">
              
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav
          className={`absolute top-full left-0 w-full ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
          } md:hidden z-50`}
        >
          <ul className="flex flex-col items-center p-4">
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full transform transition-transform duration-300 ${
                  isDarkMode
                    ? "translate-x-6 bg-white"
                    : "translate-x-0 bg-gray-900"
                }`}
              >
                {isDarkMode ? (
                  <CiLight size={16} className="text-black" />
                ) : (
                  <GiMoon size={16} className="text-white" />
                )}
              </div>
            </button>
            <li
              className="py-2 transition-all duration-700"
              onClick={() => setIsOpen(false)}
            >
              <Link
                to="/shop"
                onClick={scrollToProducts}
                className={`${
                  isActive("/shop")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                SHOP
              </Link>
            </li>
            <li
              className="py-2 transition-all duration-700"
              onClick={() => setIsOpen(false)}
            >
              <Link
                to="/contact"
                onClick={scrollToProducts}
                className={`${
                  isActive("/contact")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                CONTACT US
              </Link>
            </li>
            <li
              className="py-2 transition-all duration-700"
              onClick={() => setIsOpen(false)}
            >
              <Link
                to="/about"
                onClick={scrollToProducts}
                className={`${
                  isActive("/about")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                ABOUT US
              </Link>
            </li>
            <li
              className="py-2 transition-all duration-700"
              onClick={() => setIsOpen(false)}
            >
              <Link
                to="/faq"
                onClick={scrollToProducts}
                className={`${
                  isActive("/faq")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                FAQ
              </Link>
            </li>
            <li
              className="py-2 transition-all duration-700"
              onClick={() => setIsOpen(false)}
            >
              {isUserLoggedIn ? (
                <button
                  onClick={logout}
                  className={`${
                    isActive("/logout")
                      ? "text-yellow-300 underline decoration-dotted"
                      : ""
                  }`}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={scrollToProducts}
                  className={`${
                    isActive("/login")
                      ? "text-yellow-300 underline decoration-dotted"
                      : ""
                  }`}
                >
                  LOGIN
                </Link>
              )}
            </li>
            {!isUserLoggedIn && (
              <li className="py-2" onClick={() => setIsOpen(false)}>
                <Link
                  to="/admin"
                  onClick={scrollToProducts}
                  className={`${
                    isActive("/admin")
                      ? "text-yellow-300 underline decoration-dotted"
                      : ""
                  }`}
                >
                  ADMIN
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
