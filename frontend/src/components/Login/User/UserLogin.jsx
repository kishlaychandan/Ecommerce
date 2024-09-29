import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';

function UserLogin() {
  const { isLoggedIn, setIsLoggedIn, isUserLoggedIn, setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    isCheckUserLoggedIn();
  }, []);

  async function isCheckUserLoggedIn() {
    try {
      const response = await axios.get('/user/loggedIn');
      if (response.statusText === 'OK') {
        setIsLoggedIn(true);
        setIsUserLoggedIn(true);
      }
    } catch (err) {
      console.log('Error checking login status: ' + err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', {
        email,
        password,
        role: 'user',
      });
      console.log(response);
      setIsLoggedIn(true);
      setIsUserLoggedIn(true);
      navigate('/user/Dashboard'); // Redirect upon successful login
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        navigate('/user/Dashboard')
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-6">User Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <Link to="/forgotPassword" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserLogin;
