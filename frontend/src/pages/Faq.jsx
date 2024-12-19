// src/components/Faq.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig"; // Adjust the path to your axios instance
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing icons for the arrow
import ChatBots from "../components/ChatBot/ChatBots";
import { ThemeContext } from "../ThemeContext";
import faq from "../../public/faq.gif";

const Faq = () => {
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // State to track the currently open FAQ

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get("/faqs");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the index
  };

  return (
    <div
      className={`min-h-screen w-full bg-cover bg-center flex items-center justify-center relative ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <ChatBots />
      <div className="flex items-center justify-center w-full max-w-6xl mx-auto p-6">
        {/* FAQ Section */}
        <div
          className={`flex flex-col gap-6 shadow-2xl relative rounded-3xl w-full md:w-2/3 p-6 md:p-8 ${
            isDarkMode
              ? "text-white bg-[#0b1315] border border-gray-800"
              : "text-gray-800 bg-[#f7eff5]"
          }`}
        >
          <div className="w-full flex justify-center">
            <img
              src={faq}
              alt="FAQ Animation"
              className={`w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl rounded-full ${
                isDarkMode ? "invert" : ""
              }`}
              style={{
                animation: "scaleAnimation 3s ease-in-out infinite",
              }}
            />

            <style>
              {`
              @keyframes scaleAnimation {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.14);
                }
                100% {
                  transform: scale(1);
                }
              }
            `}
            </style>
          </div>
          <ul className="space-y-6">
            {faqs.map((faq, index) => (
              <li
                key={faq._id}
                className="border-b border-gray-300 last:border-b-0 transition-all duration-300 hover:rounded-lg"
              >
                {/* Question Section */}
                <div
                  className="flex items-center justify-between cursor-pointer py-4 px-6 rounded-lg hover:bg-teal-800 hover:text-white transition-all duration-300"
                  onClick={() => toggleFAQ(index)} // Toggle on click
                >
                  <h2 className="font-semibold text-xl">{faq.question}</h2>
                  {openIndex === index ? (
                    <FaChevronUp className="text-teal-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>

                {/* Answer Section */}
                {openIndex === index && (
                  <div
                    className={`p-6 bg-teal-50 rounded-md shadow-md transition-all duration-500 ${
                      isDarkMode ? "text-black" : "text-teal-700"
                    }`}
                  >
                    {faq.answer}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ Image - Positioned at bottom-left with tilt */}
    </div>
  );
};

export default Faq;
