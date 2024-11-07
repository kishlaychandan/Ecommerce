// import axios from "../axiosConfig";
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { userContext } from "../App";

// function Login() {
//   const searchParams = new URLSearchParams(window.location.search);
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [loginErr, setLoginErr] = useState(null);
//   const navigate = useNavigate();
//   const { setIsUserLoggedin } = useContext(userContext);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const response = await axios.post("/user/login", { ...data });
//     if (
//       response.status === 200 &&
//       response.data.message === "login successful"
//     ) {
//       setIsUserLoggedin(true);
//       searchParams.has("back_to")
//         ? navigate(searchParams.getAll("back_to").join(""))
//         : navigate("/");
//     } else {
//       setLoginErr(true);
//     }
//   }

//   function handleChange(e) {
//     setData({ ...data, [e.target.name]: e.target.value });
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
//           Login
//         </h2>
//         {loginErr && <h3 className="text-red-500 text-center mb-4">Invalid Credentials</h3>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Enter email"
//             name="email"
//             value={data.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Enter password"
//             name="password"
//             value={data.password}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <Link to="/forgetPassword" className="text-blue-500 hover:underline">
//             Forgot Password?
//           </Link>
//           <br />
//           <Link
//             to={
//               searchParams.has("back_to")
//                 ? `/register?back_to=${searchParams.getAll("back_to").join("")}`
//                 : `/register`
//             }
//             className="text-blue-500 hover:underline"
//           >
//             Don't have an account? Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import axios from "../axiosConfig";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import ChatBots from "../components/ChatBot/ChatBots";
import { useCart } from "../CartContext";
function Login() {
  const { cart, setCart, fetchCartAndWishlist } = useCart();
  const searchParams = new URLSearchParams(window.location.search);
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [loginErr, setLoginErr] = useState(null);
  const navigate = useNavigate();
  const {  isUserLoggedIn, setIsUserLoggedin,isAdminLoggedIn,setIsAdminLoggedIn } = useContext(userContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/user/login", { ...data });
      if (response.status === 200 && response.data.message === "login successful") {
        setIsUserLoggedin(true);
        fetchCartAndWishlist();
        setIsAdminLoggedIn(false);
        searchParams.has("back_to")
          ? navigate(searchParams.getAll("back_to").join(""))
          : navigate("/");
      } else {
        setIsUserLoggedin(false);
        setLoginErr(true);
      }
    } catch (error) {
      setLoginErr(true);
    }
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <div 
      className="flex items-center justify-center min-h-screen" 
      style={{ 
        backgroundImage: 'url("https://images.pexels.com/photos/7862593/pexels-photo-7862593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ChatBots/>
      <div className="bg-purple-500 bg-opacity-20 p-8 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">
          Login
        </h2>
        {loginErr && (
          <h3 className="text-red-500 text-center mb-4">
            Invalid Credentials
          </h3>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgetPassword" className="text-yellow-300 hover:underline">
            Forgot Password?
          </Link>
          <br />
          <Link
            to={
              searchParams.has("back_to")
                ? `/register?back_to=${searchParams.getAll("back_to").join("")}`
                : `/register`
            }
            className="text-yellow-300 hover:underline"
          >
            Don't have an account? <span className="text-blue-300 text-lg">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
