import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the import based on your project structure
import ChatBots from "../components/ChatBot/ChatBots";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
function About() {
  const [aboutData, setAboutData] = useState("");
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context
  
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
      className="min-h-screen p-6 flex items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: isDarkMode ? "linear-gradient(to bottom, gray, black)" : "linear-gradient(to bottom right, white,#6037ac,#6037ac)",
      }}
    >
      <ChatBots/>
      <div className="bg-white shadow-2xl rounded-3xl max-w-4xl w-full mx-4 overflow-hidden relative z-10">
        {/* <div className="bg-blue-600 text-white p-8 rounded-t-3xl"> */}
        {/* apply dark mode light mode */}
        <div className={`bg-${isDarkMode ? "gray-700" : "blue-600"} text-white p-8 rounded-t-3xl`}>
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
      {/* <div className="absolute inset-0 bg-black opacity-30 z-0" /> */}
    </div>
  );
}

export default About;
