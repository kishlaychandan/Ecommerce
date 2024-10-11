
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "../axiosConfig";
import { FaCartArrowDown, FaBars, FaTimes, FaHeart } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route path
  const { isUserLoggedIn, setIsUserLoggedin,isAdminLoggedIn, setIsAdminLoggedIn } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu

  async function logout() {
    try {
      const response = await axios.post("/user/logout", {});
      if (response.statusText === "OK") {
        console.log("logged out");
        setIsUserLoggedin(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="z-50 sticky top-0 p-5 w-full py-5 bg-slate-700 text-white flex items-center justify-between">
      {/* Left Side Logo */}
      <h1 className="text-3xl">
        <Link to="/">FREE KA DUKAN</Link>
      </h1>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Navigation - Center */}
      <nav className="hidden md:flex flex-grow justify-center">
        <ul className="flex items-center gap-8">
          <li>
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-yellow-300 underline decoration-dotted"
                  : ""
              } hover:text-yellow-300`}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${
                isActive("/about")
                  ? "text-yellow-300 underline decoration-dotted"
                  : ""
              } hover:text-yellow-300`}
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={`${
                isActive("/faq")
                  ? "text-yellow-300 underline decoration-dotted"
                  : ""
              } hover:text-yellow-300`}
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
              } hover:text-yellow-300`}
            >
              Contact us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Side - Cart, Wishlist, Register, Login/Logout */}
      <ul className="hidden md:flex items-center gap-6 justify-center">
        <li>
          <Link to="/wishlist">
            <FaHeart style={{ fontSize: "1.3rem" }} />
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FaCartArrowDown style={{ fontSize: "1.5rem" }} />
          </Link>
        </li>
        {isUserLoggedIn && (
          <li className="py-2">
            <Link to="/orders">Orders</Link>
          </li>
        )}
        
        {!isUserLoggedIn && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        <li>
          {isUserLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        {!isUserLoggedIn && (
          <li className="py-2">
            <Link to="/admin">Admin</Link>
          </li>
        )}
      </ul>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-slate-700 text-white md:hidden">
          <ul className="flex flex-col items-center p-4">
            <li className="py-2">
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                Shop
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/contact"
                className={`${
                  isActive("/contact")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                Contact us
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/about"
                className={`${
                  isActive("/about")
                    ? "text-yellow-300 underline decoration-dotted"
                    : ""
                }`}
              >
                About us
              </Link>
            </li>
            <li className="py-2">
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
            <li className="py-2">
              <Link to="/cart">
                <FaCartArrowDown style={{ fontSize: "1.5rem" }} />
              </Link>
            </li>
            <li className="py-2">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            {!isUserLoggedIn && (
              <li className="py-2">
                <Link to="/register">Register</Link>
              </li>
            )}
            <li className="py-2">
              {isUserLoggedIn ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            {!isUserLoggedIn && (
              <li className="py-2">
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;