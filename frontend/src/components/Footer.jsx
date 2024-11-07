import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
function Footer() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`py-6 w-full ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-[#6037ac] text-[#e88344]"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-around space-y-4 md:flex-row md:space-y-0">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <p>© 2023 Kamakhya Enterprises. All Rights Reserved.</p>
            <p>kalkere, Bengaluru, Karnataka, India</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-between gap-4">
            <div className="flex items-center flex-wrap gap-4 text-center">
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
              <Link to="/shop" className="hover:text-gray-400">
                Shop
              </Link>
              <Link to="/about" className="hover:text-gray-400">
                About
              </Link>
              <Link to="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </div>
            <div className="w-full flex items-center justify-around flex-wrap gap-4 text-center">
              <Link to={"https://facebook.com"}><FaFacebookF size={24} className="hover:text-gray-400" />
              </Link>
              <Link to={"https://instagram.com"}><FaInstagram size={24} className="hover:text-gray-400" /></Link>
              <Link to={"https://twitter.com"}><FaTwitter size={24} className="hover:text-gray-400" /></Link>
              <Link to={"https://linkedin.com"}><FaLinkedin size={24} className="hover:text-gray-400" /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
