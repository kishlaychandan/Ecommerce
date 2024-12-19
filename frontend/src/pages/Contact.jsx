import React, { useState } from "react";
import emailjs from "emailjs-com";
import ChatBots from "../components/ChatBot/ChatBots";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import s2 from "../assets/s2.jpg";
import dove from "../assets/dove.gif";
import Enquiry from "../../public/Enquiry.mp4";
const Contact = () => {
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid.";
    if (!formData.message) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  let service = import.meta.env.VITE_SERVICE;
  let template = import.meta.env.VITE_TEMPLATE;
  let user = import.meta.env.VITE_USER;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      emailjs
        .send(service, template, formData, user)
        .then(() => {
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-center w-full min-h-screen p-6 bg-cover bg-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <ChatBots />
        {/* Google Map Section */}
        <div
          className={`w-full max-w-6xl mb-8 rounded-lg shadow-lg overflow-hidden ${
            isDarkMode ? "border border-gray-700" : "border border-gray-300"
          }`}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3697.691502314736!2d77.58949647483884!3d12.832025487470682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b22cb513a67%3A0x16752638e41c5ae7!2sHYKI!5e1!3m2!1sen!2sin!4v1734423073353!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className={`${isDarkMode ? "filter grayscale" : ""}`}
          ></iframe>
        </div>

        {/* Contact Details and Form Section */}
        <div
          className={`w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          {/* Left - Contact Info */}
          <div
            className={`flex flex-col gap-4 p-6 rounded-lg shadow-lg ${
              isDarkMode
                ? "text-gray-200 bg-gray-800 border border-gray-700"
                : "text-gray-800 bg-white border border-gray-300"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDarkMode ? "text-teal-300" : "text-teal-600"
              }`}
            >
              Location
            </h2>
            <p>
              📍 <strong>Address:</strong> Kamakhya Enterprises Shamasundar
              Singh layout, near Nageshwar Temple, Kalkere, Bannerghatta Road,
              Bannerghatta, Karnataka 560083, India
            </p>
            <p>
              📞 <strong>Phone:</strong> +917026202925
            </p>
            <p>
              ✉️ <strong>Email:</strong>{" "}
              <a
                href="mailto:kamakhyaenterprises.srg@gmail.com"
                className={`${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-500"
                }`}
              >
                kamakhyaenterprises.srg@gmail.com
              </a>
            </p>
            <p>
              🕒 <strong>Office Hours:</strong> Mon-Fri, 9AM - 5PM
            </p>

            <img
              src={s2}
              className={`${isDarkMode ? "filter grayscale" : ""}`}
              alt=""
            />
          </div>

          {/* Right - Enquiry Form */}
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4 p-8 rounded-lg shadow-lg ${
              isDarkMode
                ? "text-gray-200 bg-gray-800 border border-gray-700"
                : "text-gray-800 bg-gray-100 border border-gray-300"
            }`}
          >
            <div className="flex items-center flex-wrap gap-4 justify-center md:justify-start">
              <h2
                className={`text-2xl font-semibold ${
                  isDarkMode ? "text-teal-300" : "text-teal-600"
                }`}
              >
                Enquiry Here
              </h2>
              <video
                src={Enquiry}
                autoPlay
                muted
                loop
                playsInline
                className="w-20 rounded-full"
                style={{ display: "block", pointerEvents: "none" }}
              ></video>
            </div>

            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg text-base outline-none transition-all ${
                  isDarkMode
                    ? "bg-gray-700 text-white border border-gray-600 focus:border-blue-400"
                    : "bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg text-base outline-none transition-all ${
                  isDarkMode
                    ? "bg-gray-700 text-white border border-gray-600 focus:border-blue-400"
                    : "bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1 font-medium">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full h-24 p-2 rounded-lg text-base outline-none transition-all ${
                  isDarkMode
                    ? "bg-gray-700 text-white border border-gray-600 focus:border-blue-400"
                    : "bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message}</span>
              )}
            </div>
            <button
              type="submit"
              className={`self-center py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none ${
                isDarkMode
                  ? "bg-teal-600 text-white hover:bg-teal-500"
                  : "bg-teal-500 text-white hover:bg-teal-700"
              }`}
            >
              Send Message
            </button>
            {loading && (
              <div className="flex justify-center items-center">
                <img
                  src={dove}
                  alt="Loading..."
                  className="w-12 h-12 rounded-full"
                />
              </div>
            )}
            {submitted && (
              <p className="text-green-400 text-base text-center">
                Thank you for your message!
              </p>
            )}

            {/* <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
