import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import ChatBots from "../components/ChatBot/ChatBots";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import about from "../../public/about.avif";
import professionalWomen from "../../public/professionalWomen.jpg"

function About() {
  const [aboutData, setAboutData] = useState("");
  const { isDarkMode } = useContext(ThemeContext);

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
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <ChatBots />
      <div className="container mx-auto py-16 px-6 md:px-12 lg:px-24">
        {/* Main Heading */}
        <h1
          className={`text-4xl font-bold text-center mb-10 ${
            isDarkMode ? "text-white" : "text-teal-600"
          }`}
        >
          About Hyki
        </h1>

        {/* Intro Section */}
        <div className="flex flex-col lg:flex-row items-start mb-12">
          <div className="lg:w-1/2">
            <img
              src={about}
              alt="HYKI"
              className={`rounded-lg shadow-lg w-full object-cover h-96 ${
                isDarkMode ? "invert grayscale" : ""
              }`}
            />
          </div>
          <div
            className={`lg:w-1/2 lg:pl-12 mt-8 lg:mt-0 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-teal-600"
              }`}
            >
              Welcome to HYKI
            </h2>
            <p
              className="text-lg prose prose-lg"
              dangerouslySetInnerHTML={{ __html: aboutData }}
            />
          </div>
        </div>

        {/* Our Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
              isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-white text-gray-600"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-teal-600"
              }`}
            >
              Our Mission
            </h3>
            <p>
              Our mission is to create an accessible and enjoyable shopping
              experience for everyone. We are dedicated to offering an extensive
              selection of high-quality products across various categories,
              ensuring every customer finds exactly what they need.
            </p>
          </div>

          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
              isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-white text-gray-600"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-teal-600"
              }`}
            >
              Our Vision
            </h3>
            <p>
              We envision a world where shopping is effortless, inclusive, and
              fun for everyone. HYKI strives to be the most customer-centric
              platform, delivering products quickly and efficiently to every
              corner of the country while embracing sustainable practices.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div
          className={`mt-16 py-12 rounded-lg shadow-md ${
            isDarkMode ? "bg-gray-700 text-gray-300" : "bg-teal-800 text-white"
            // isDarkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-600"
          }`}
        >
          <h2
            className={`text-3xl font-bold text-center mb-6 ${
              isDarkMode ? "text-white" : "text-gray-100"
            }`}
          >
            Why Choose HYKI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold">Quality Products</h3>
              <p className="mt-4">
                We offer top-tier products across multiple categories, ensuring
                that quality is never compromised.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">Secure Payments</h3>
              <p className="mt-4">
                HYKI offers secure payment gateways, protecting your personal
                and payment details at every step.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="mt-4">
                With an extensive logistics network, we ensure your orders are
                delivered swiftly and safely to your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2
            className={`text-3xl font-bold text-center mb-8 ${
              isDarkMode ? "text-white" : "text-teal-600"
            }`}
          >
            Meet Our Team
          </h2>
          <div className={`grid md:grid-cols-3 gap-8 ${isDarkMode ? "filter grayscale" : ""}`}>
            {[
              {
                name: "Prashant J.",
                role: "CEO & Founder",
                img:
                  "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg",
              },
              {
                name: "Sunny Kumar",
                role: "CTO & Co-Founder",
                img:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHytcaoXDqynWuboDMnjyJ-kG1mxiWQGGuzzTGOWize35jKiP9VUWvOUhkEZtXYOxexKQ&usqp=CAU",
              },
              {
                name: "Sarah Brown",
                role: "Chief Marketing Officer",
                img: professionalWomen,
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
                />
                <h3
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-teal-600"
                  }`}
                >
                  {member.name}
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mt-16">
          <h2
            className={`text-3xl font-bold text-center mb-8 ${
              isDarkMode ? "text-white" : "text-teal-600"
            }`}
          >
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`p-6 rounded-lg shadow-md ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-white text-gray-600"
              }`}
            >
              <p className="italic">
                "HYKI has been a game-changer for me. The variety of products
                and the ease of shopping make it my go-to online store. Highly
                recommended!"
              </p>
              <p
                className={`mt-4 font-bold ${
                  isDarkMode ? "text-white" : "text-teal-600"
                }`}
              >
                - Ramesh Kumar
              </p>
            </div>
            <div
              className={`p-6 rounded-lg shadow-md ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-white text-gray-600"
              }`}
            >
              <p className="italic">
                "Fast delivery, great customer service, and high-quality
                products. HYKI never disappoints!"
              </p>
              <p
                className={`mt-4 font-bold ${
                  isDarkMode ? "text-white" : "text-teal-600"
                }`}
              >
                - Sunita Verma
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
