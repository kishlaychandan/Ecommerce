import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`py-10 w-full ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-[#44404d] text-[#e88344]"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h1 className="text-2xl font-bold mb-4">Kamakhya Enterprises</h1>
            <p className="text-gray-200">
              Your trusted partner for a wide range of services and products. 
              We provide exceptional value with top-notch customer care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300 transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gray-300 transition duration-200">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300 transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300 transition duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-gray-300 transition duration-200">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 transition duration-200">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 transition duration-200">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 transition duration-200">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2 text-gray-200">
              <li>
                <span className="font-bold">Email:</span> support@kamakhya.com
              </li>
              <li>
                <span className="font-bold">Phone:</span> +123 456 7890
              </li>
              <li>
                <span className="font-bold">Location:</span> Kalkere, Bengaluru, Karnataka, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-400" />

        {/* Social Icons and Copyright */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-200">&copy; 2023 Kamakhya Enterprises. All rights reserved.</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-200 hover:text-gray-300 transition duration-200"
            >
              <FaFacebookF className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-200 hover:text-gray-300 transition duration-200"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-200 hover:text-gray-300 transition duration-200"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-200 hover:text-gray-300 transition duration-200"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
