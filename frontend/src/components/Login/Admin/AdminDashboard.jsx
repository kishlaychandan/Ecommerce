import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig";
import { userContext } from "../../../App";
import Dashboard from "./Dashboard/Dashboard";
import ViewListing from "./ViewListing/ViewListing";
import AddProduct from "./AddProduct/AddProduct";
import Review from "../../Review/Review";
import EditAbout from "../../EditAbout";
import EditFaq from "../../EditFaq";
import AdminCoupon from "../../AdminCoupon";
import EditReview from "./EditReview";
import RegisteredUsers from "./RegisteredUsers";
import AdminOrders from "../../AdminOrders";
import SalesChart from "./SalesChart";
const ProfileUpdate = () => <h1 className="text-2xl">Profile Update</h1>;
const ChangePassword = () => <h1 className="text-2xl">Change Password</h1>;

const AdminDashboard = () => {
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useContext(userContext);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAdminSettingOpen, setIsAdminSettingOpen] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin"); // Redirect if not logged in
    }
  }, [isAdminLoggedIn, navigate]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "sales":
          return <SalesChart />;
      case "AddProducts":
        return <AddProduct />;
      case "ViewListing":
        return <ViewListing />;
      case "RegUsers":
        return <RegisteredUsers />;
      case "ViewReviews":
        return <EditReview />;
      case "FAQ":
        return <EditFaq />;
      case "AboutUs":
        return <EditAbout />;
      case "coupon":
        return <AdminCoupon />;
      // case "ProfileUpdate":
      //   return <ProfileUpdate />;
      // case "ChangePassword":
      //   return <ChangePassword />;
      case "manageOrder":
        return <AdminOrders />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/user/logout", {});
      if (response.status === 200) {
        setIsAdminLoggedIn(false);
        navigate("/admin");
      }
    } catch (err) {
      console.log("Error during logout:", err.message);
    }
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } w-64 bg-gray-800 text-white flex flex-col fixed top-0 left-0 h-full z-10 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 bg-gray-900 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Welcome: Admin</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-2xl text-white"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("Dashboard")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Dashboard
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("sales")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Sales Chart
              </button>
            </li>

            {/* Admin Setting with Dropdown */}
            {/* <li className="py-2">
              <button
                onClick={() => setIsAdminSettingOpen(!isAdminSettingOpen)}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Admin Setting
              </button>
              {isAdminSettingOpen && (
                <ul className="ml-4 mt-2">
                  <li className="py-2">
                    <button
                      onClick={() => setActiveComponent("ProfileUpdate")}
                      className="w-full text-left py-2 px-4 bg-gray-600 rounded hover:bg-gray-500"
                    >
                      Profile Update
                    </button>
                  </li>
                  <li className="py-2">
                    <button
                      onClick={() => setActiveComponent("ChangePassword")}
                      className="w-full text-left py-2 px-4 bg-gray-600 rounded hover:bg-gray-500"
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
              )}
            </li> */}

            {/* Other Menu Items */}
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("AddProducts")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Add Products
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("ViewListing")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                View Listing
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("RegUsers")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Registered Users
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("manageOrder")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Orders
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("ViewReviews")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Reviews
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("FAQ")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                FAQ
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("AboutUs")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                About Us
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => setActiveComponent("coupon")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Coupon
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded hover:bg-gray-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Toggle button when sidebar is closed */}
      {!isSidebarOpen && (
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-white bg-gray-800 p-2 rounded"
          >
            <FaBars />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 bg-gray-100 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="navbar flex justify-between items-center text-white bg-slate-800 pl-12 pr-6 p-2">
          <h1 className="md:text-2xl text-xl pl-6">Admin</h1>
          <button className="md:text-2xl text-xl" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="p-6">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
