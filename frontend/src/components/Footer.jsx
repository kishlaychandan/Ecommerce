import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`py-10 w-full ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-[#2d2a36] text-[#f2a93b]"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-wrap justify-between gap-16">
          {/* Company Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">Kamakhya Enterprises</h1>
            <p className="text-gray-300">
              Your trusted partner for a wide range of services and products. We provide exceptional value with top-notch customer care.
            </p>
          </div>

          {/* Quick Links and Customer Service */}
          <div className="flex flex-1 gap-10 justify-between">
            {/* Quick Links */}
            <div className="w-full sm:w-auto">
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="w-full sm:w-auto">
              <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Help & FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="font-bold">Email:</span> kamakhyaenterprises.srg@gmail.com
              </li>
              <li>
                <span className="font-bold">Phone:</span> +917026202925
              </li>
              <li>
                <span className="font-bold">Location:</span> Kalkere, Bengaluru, Karnataka, India, 560083
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-600" />

        {/* Social Icons and Copyright */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300">
              &copy; 2023 Kamakhya Enterprises. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-300 hover:text-gray-400 transition duration-200 p-3 rounded-full border-2 border-gray-300 hover:border-[#f2a93b]"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-300 hover:text-gray-400 transition duration-200 p-3 rounded-full border-2 border-gray-300 hover:border-[#f2a93b]"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-300 hover:text-gray-400 transition duration-200 p-3 rounded-full border-2 border-gray-300 hover:border-[#f2a93b]"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-300 hover:text-gray-400 transition duration-200 p-3 rounded-full border-2 border-gray-300 hover:border-[#f2a93b]"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
