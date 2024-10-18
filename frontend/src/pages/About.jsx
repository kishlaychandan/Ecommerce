import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the import based on your project structure
import ChatBots from "../components/ChatBot/ChatBots";
function About() {
  const [aboutData, setAboutData] = useState("");

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const response = await axios.get("/about");
        setAboutData(response.data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    }

    fetchAboutData();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=600')",
      }}
    >
      <ChatBots/>
      <div className="bg-white shadow-2xl rounded-3xl max-w-4xl w-full mx-4 overflow-hidden relative z-10">
        <div className="bg-blue-600 text-white p-8 rounded-t-3xl">
          <h1 className="text-5xl font-extrabold text-center">About Us</h1>
          <p className="mt-2 text-center text-lg">Who We Are and What We Do</p>
        </div>
        <div className="p-8">
          <div
            className="prose prose-lg text-gray-800"
            dangerouslySetInnerHTML={{ __html: aboutData }}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
    </div>
  );
}

export default About;
