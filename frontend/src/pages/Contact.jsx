import React, { useState } from "react";
import emailjs from "emailjs-com";
import ChatBots from "../components/ChatBot/ChatBots";

const Contact = () => {
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
        className="relative flex flex-col items-center justify-center w-full min-h-screen p-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1645692396914-4ca9df38cce3?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <ChatBots />
        <h1 className="text-4xl m-6 text-gray-300 font-bold text-center">
          CONTACT US
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-xl p-12 border border-gray-300 rounded-xl shadow-lg text-lg text-gray-400"
        >
          {submitted && (
            <p className="text-green-500 text-base text-center">
              Thank you for your message!
            </p>
          )}
          {loading && (
            <p className="text-yellow-500 text-base text-center">Sending...</p>
          )}
          <div className="flex flex-col ">
            <label htmlFor="name" className="mb-1 text-gray-100 font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all focus:border-blue-500 outline-none"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-100 font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg text-base transition-all focus:border-blue-500 outline-none"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="mb-1 text-gray-100 font-medium">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-36 p-3 border border-gray-200 rounded-lg text-base transition-all focus:border-blue-500 outline-none"
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
