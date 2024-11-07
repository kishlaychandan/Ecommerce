// src/components/Faq.jsx
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the path to your axios instance
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing icons for the arrow
import ChatBots from "../components/ChatBot/ChatBots";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

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
    <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
    style={{
      backgroundImage: isDarkMode ? "linear-gradient(to bottom, gray, black)" : "linear-gradient(to bottom left, white,#6037ac,#6037ac)",
      }}>
        <ChatBots />
      <div className={`shadow-2xl rounded-3xl w-full mx-4 max-w-4xl p-8 ${isDarkMode ? "text-white bg-gray-800" : "text-blue-600 bg-white"}`}>
        <h1 className="text-4xl font-extrabold text-center  mb-6">FREQUENTLY ASKED QUESTIONS</h1>
        <ul className="space-y-4">
          {faqs.map((faq, index) => (
            <li key={faq._id} className="border-b last:border-b-0">
              <div
                className="flex items-center justify-between cursor-pointer py-4"
                onClick={() => toggleFAQ(index)} // Toggle on click
              >
                <h2 className="font-semibold text-lg ">{faq.question}</h2>
                {openIndex === index ? (
                  <FaChevronUp className="" />
                ) : (
                  <FaChevronDown className="" />
                )}
              </div>
              {openIndex === index && (
                <p className="p-4  rounded-lg">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faq;
