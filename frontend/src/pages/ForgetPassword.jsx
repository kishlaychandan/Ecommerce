import React, { useState } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function sendEmail(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/user/forgetPassword",
        { email }
      );
      alert("Password reset link sent to your email");
      setStage(2);
    } catch (err) {
      if (err.response?.status === 400) alert("User not found");
      else alert("Internal server error");
    }
  }

  const otpVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/verifyOtp",
        { email, otp }
      );
      alert(response.data.message);
      setStage(3);
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/changePassword",
        { email, password }
      );
      alert(response.data.message);
      if (response.data.message === "Password changed successfully") {
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Internal server error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {stage === 1
            ? "Forgot Password"
            : stage === 2
            ? "Verify OTP"
            : "Change Password"}
        </h2>

        {/* Form Logic */}
        {stage === 1 ? (
          <form className="space-y-6" onSubmit={sendEmail}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Submit
            </button>
          </form>
        ) : stage === 2 ? (
          <form className="space-y-6" onSubmit={otpVerify}>
            <div className="flex flex-col">
              <label htmlFor="otp" className="text-gray-600 font-medium">
                OTP Code
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={changePassword}>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-600 font-medium">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-gray-600 font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Change Password
            </button>
          </form>
        )}

        {/* Back to Login and Additional Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <Link
            to="/login"
            className="text-blue-500 hover:underline transition duration-300"
          >
            Back to Login
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
