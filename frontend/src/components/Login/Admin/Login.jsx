import React, { useEffect } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../AuthContext';

function Login() {
  const { isLoggedIn, setIsLoggedIn, setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkAdminLoggedIn();
  }, []);

  async function checkAdminLoggedIn() {
    try {
      const response = await axios.get("/user/loggedIn");
      if (response.statusText === "OK") {
        setIsLoggedIn(true);
        setIsAdminLoggedIn(true);
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
      console.log(response);
      setIsLoggedIn(true);
      setIsAdminLoggedIn(true);
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Solid color background */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <Link to="/forgotPassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
