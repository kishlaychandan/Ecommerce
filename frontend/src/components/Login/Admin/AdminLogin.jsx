import React, { useEffect, useState } from 'react';
import axios from '../../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { userContext } from "../../../App";
import { useContext } from 'react';
import ChatBots from '../../ChatBot/ChatBots';
function AdminLogin() {
  const { isAdminLoggedIn, setIsAdminLoggedIn, isUserLoggedIn, setIsUserLoggedin } = useContext(userContext);
  // const { isAdminLoggedIn, setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    checkAdminLoggedIn();
  }, []);

  // useEffect(() => {
  //   if (isAdminLoggedIn) {
  //     navigate("/admin/dashboard");
  //   }
  // }, [isAdminLoggedIn, navigate]); // Effect to navigate if admin is logged in

  async function checkAdminLoggedIn() {
    try {
      const response = await axios.get("/user/adminLoggedIn");
      if (response.request.status === 200 || response.statusText === "OK") {
        console.log("Admin is logged in");
        setIsAdminLoggedIn(true);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log("Error checking login status: " + err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/login", {
        email,
        password,
        role: "admin",
      });

      console.log("Response: hanle submit",response);
      console.log("response.status",response.status);
      console.log("response.request.status",response.request.status);
      console.log(response.request.status === 200);
      console.log(response.statusText === "OK");
      
      
      if (response.request.status === 200 || response.statusText === "OK") {
        console.log("Admin logged in");
        setIsAdminLoggedIn(true);
        setIsUserLoggedin(false);
        navigate("/admin/dashboard");
      }
      else{
        console.log("if not work not redirect");
        
      }
      setErrorMessage(""); // Clear any previous error messages
    } catch (err) {
      console.log(err.message);
      setErrorMessage("Invalid credentials. Please try again."); // Set error message
    }
  }

  return (
    <div 
      className="flex items-center justify-center min-h-screen" 
      style={{ 
        backgroundImage: 'url("https://images.pexels.com/photos/7862593/pexels-photo-7862593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <ChatBots/>
      <div className="bg-purple-600 rounded-lg shadow-lg p-8 max-w-md w-full"> {/* Purple background for form */}
        <h2 className="text-3xl font-bold text-center text-yellow-300  mb-6">Admin Login</h2>
        {errorMessage && ( // Conditionally render the error message
          <div className="mb-4 p-2 text-center rounded-md bg-red-200 text-red-800">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-6">
            <label className="block text-yellow-300 text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="test email: kishlaychandan00@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-yellow-300 text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="test password: 1234"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          {/* <div className="flex justify-between items-center mb-6">
            <Link to="/forgotPassword" className="text-orange-500 hover:underline">Forgot Password?</Link>
          </div> */}
          <button
            type="submit"
            className="w-full mt-4 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-orange-500 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
