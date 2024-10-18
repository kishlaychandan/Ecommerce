import React, { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

function Dashboard() {
  const { setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [totalListings, setTotalListings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); // New state for total orders

  // Fetch all data on component load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      // Fetching total listings (products)
      const productsResponse = await axios.get("/product/getproduct");
      setTotalListings(productsResponse.data.products.length);

      // Fetching total users
      const userresponse = await axios.get("/user");
      setTotalUsers(userresponse.data.users.length); // Assuming the response contains a list of users

      // Fetching total orders
      const orderresponse = await axios.get("/orders/all");
      setTotalOrders(orderresponse.data.length);

    } catch (err) {
      console.log("Error fetching dashboard data:", err.message);
    }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Listings */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center border-t-4 border-blue-500 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-700">Total Listings</h2>
          <p className="text-5xl font-bold text-blue-600 mt-4">{totalListings}</p>
          {/* <button onClick={}>Total Listings</button> */}
        </div>

        {/* Total Registered Users */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center border-t-4 border-green-500 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-700">Total Registered Users</h2>
          <p className="text-5xl font-bold text-green-600 mt-4">{totalUsers}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center border-t-4 border-yellow-500 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-5xl font-bold text-yellow-600 mt-4">{totalOrders}</p>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
