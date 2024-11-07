import React, { useState } from "react";
import emailjs from "emailjs-com";
import ChatBots from "../components/ChatBot/ChatBots";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
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
      {/* <Navbar /> */}
      <div
        className="relative flex flex-col items-center justify-center w-full  min-h-screen p-6 bg-cover bg-center"
        style={{
          backgroundImage: isDarkMode ? "linear-gradient(to bottom, gray, black)" : "linear-gradient(to bottom right, white,#6037ac,#6037ac)",
       }}
      >
        <ChatBots />
        <h1 className={`text-5xl font-extrabold text-center p-6 ${isDarkMode ? "text-white" : "text-blue-700"}`}>
          CONTACT US
        </h1>
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 w-full max-w-3xl p-12 border border-gray-500 rounded-xl shadow-lg text-lg ${isDarkMode ? "text-white border-white bg-gray-900" : "text-gray-900 border-white"}`}
        >
          {submitted && (
            <p className="text-green-500 text-base text-center">
              Thank you for your message!
            </p>
          )}
          {loading && (
            <p className="text-yellow-500 text-base text-center">Sending...</p>
          )}
          <div className={`flex flex-col `}>
            <label htmlFor="name" className="mb-1 font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 text-black rounded-lg text-base transition-all focus:border-blue-500 outline-none"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1  font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 text-black rounded-lg text-base transition-all focus:border-blue-500 outline-none"
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
              className="w-full h-24 p-2 border border-gray-700 text-black rounded-lg text-base transition-all focus:border-blue-500 outline-none"
            />
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="self-center py-3 px-6 bg-blue-500 text-white rounded-lg font-medium transition-all transform hover:bg-blue-700 hover:scale-105 focus:outline-none"
          >
            Send Message
          </button>
        </form>
      </div>
      {/* <ChatBots />
      <Footer /> */}
    </>
  );
};

export default Contact;
