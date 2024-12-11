import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from '../Login/axiosConfig' 
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, isUserLoggedIn, setIsUserLoggedIn, isAdminLoggedIn, setIsAdminLoggedIn } = useAuth();
  async function handleLogout(){
    try{
      const response = await axios.post("/user/logout", {
        
      });
      console.log(response);
      if (response.statusText === "OK") {
        console.log("logged out");
        setIsLoggedIn(false);
        setIsUserLoggedIn(false);
      }
    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">MyApp</h1>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>

          {/* Show Register and Admin Login only if no one is logged in */}
          {!isLoggedIn && (
            <>
              <Link to="/register" className="text-white hover:text-gray-200">SignUp</Link>
              <Link to="/admin/login" className="text-white hover:text-gray-200">AdminLogin</Link>
            </>
          )}

          {/* Show User Login only if not logged in */}
          {!isLoggedIn && (
            <Link to="/user/login" className="text-white hover:text-gray-200">UserLogin</Link>
          )}

          {/* cart */}
          {
            isUserLoggedIn ? 
              <Link to="/user/cart" className="text-white hover:text-gray-200">Cart (ItemCount)</Link>:
              <Link to="/user/login" className="text-white hover:text-gray-200">Cart 0</Link>
            
          }

          {/* Show Dashboard when logged in */}
          {isLoggedIn && (
            <>
            <button onClick={handleLogout}>Logout</button>
              </>
          )}

          <Link to="/user/deals" className="text-white hover:text-gray-200">Deals</Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
