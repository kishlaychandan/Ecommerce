import React, { useContext, useState } from "react";
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
import { useCart } from "../CartContext";
import { FaSun } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import { IoSunny } from "react-icons/io5";
import { RiSunLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

function Header() {
  const { cart, setCart, fetchCartAndWishlist } = useCart();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route path
  const {
    isUserLoggedIn,
    setIsUserLoggedin,
    isAdminLoggedIn,
    setIsAdminLoggedIn,
  } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu
  const [open, setOpen] = useState(false);

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

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`z-50 sticky top-0 p-5 w-full py-5 flex items-center justify-between ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#6037ac] text-[#db7b40]"
      }`}
    >
      {/* Left Side Logo */}
      <h1 className="max-w-[20vw] overflow-hidden">
        <Link to="/">
          <img src={HYKI} alt="" className="h-10 w-full" />{" "}
        </Link>
      </h1>

      {/* Desktop Navigation - Center */}
      <nav className="hidden md:flex flex-grow justify-center">
        <ul className="flex items-center gap-8">
          <li>
            <Link
              to="/shop"
              className={`${
                isActive("/shop")
                  ? "text-yellow-300 underline decoration-dotted"
                  : ""
              } hover:text-yellow-300 font-bold`}
            >
              SHOP
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${
                isActive("/about")
                  ? "text-yellow-300 underline decoration-dotted"
                  : ""
              } hover:text-yellow-300 font-bold`}
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={`${
                isActive("/faq")
                  ? "text-yellow-300 underline decoration-dotted"
                  : ""
              } hover:text-yellow-300 font-bold`}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${
                isActive("/contact")
                  ? "text-yellow-300 underline decoration-dotted"
                  : ""
              } hover:text-yellow-300 font-bold`}
            >
              CONTACT US
            </Link>
          </li>
        </ul>
      </nav>

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

          {/* {!isUserLoggedIn && (
            <li>
              <Link to="/register">REGISTER</Link>
            </li>
          )} */}
          <li>
            {isUserLoggedIn ? (
              <button onClick={logout}><CiLogout className="text-2xl" /></button>
            ) : (
              <div className="dropdown-container">
      <div className="dropdown-toggle" onClick={() => setOpen(!open)}>
        <FaUserCircle className="animate-spin" style={{ fontSize: "2rem", cursor: "pointer"}} />
      </div>
      {open && (
        <div className="dropdown-menu absolute p-1 translate-x-[-2rem] translate-y-[0.5rem] border shadow-md rounded-md">
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
                className={`${
                  isActive("/faq")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                FAQ
              </Link>
            </li>
            {/* <li
              className="py-2 transition-all duration-700"
              onClick={() => setIsOpen(false)}
            >
              <Link
                to="/cart"
                className={`${
                  isActive("/cart")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                <FaCartArrowDown style={{ fontSize: "1.5rem" }} />
              </Link>
            </li>
            <li
              className="py-2 transition-all duration-700"
              onClick={() => setIsOpen(false)}
            >
              <Link
                to="/wishlist"
                className={`${
                  isActive("/wishlist")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                WISHLIST
              </Link>
            </li> */}
            {/* {!isUserLoggedIn && (
              <li
                className="py-2 transition-all duration-700"
                onClick={() => setIsOpen(false)}
              >
                <Link
                  to="/register"
                  className={`${
                    isActive("/register")
                      ? "text-yellow-300 underline decoration-dotted"
                      : ""
                  }`}
                >
                  REGISTER
                </Link>
              </li>
            )} */}
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
