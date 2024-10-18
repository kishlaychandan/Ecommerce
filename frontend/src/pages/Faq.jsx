// src/components/Faq.jsx
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the path to your axios instance
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing icons for the arrow
import ChatBots from "../components/ChatBot/ChatBots";

const Faq = () => {
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
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/wet-monstera-deliciosa-plant-leaves-garden_53876-139814.jpg?w=996&t=st=1728580486~exp=1728581086~hmac=b4c56713cbfe8ffe8efdd6a2514968b4fbccadf806b556bb80576f7c8fb65d45')",
      }}>
        <ChatBots />
      <div className="bg-white shadow-2xl rounded-3xl max-w-4xl w-full mx-4 p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">FREQUENTLY ASKED QUESTIONS</h1>
        <ul className="space-y-4">
          {faqs.map((faq, index) => (
            <li key={faq._id} className="border-b last:border-b-0">
              <div
                className="flex items-center justify-between cursor-pointer py-4"
                onClick={() => toggleFAQ(index)} // Toggle on click
              >
                <h2 className="font-semibold text-lg text-blue-700">{faq.question}</h2>
                {openIndex === index ? (
                  <FaChevronUp className="text-blue-600" />
                ) : (
                  <FaChevronDown className="text-blue-600" />
                )}
              </div>
              {openIndex === index && (
                <p className="p-4 bg-gray-100 rounded-lg">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faq;
