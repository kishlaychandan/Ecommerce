// import React, { useEffect, useState } from "react";
// import axios from "../axiosConfig";
// import { toast } from "react-toastify"; // for notifications
// import { Link } from "react-router-dom"; // assuming you have a route for product details
// import { useCart } from "../CartContext";
// const Wishlist = () => {
//   const{cart,setCart,wishlist,setWishlist}=useCart()
//   const [wishlistProducts, setWishlistProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch wishlist items on component mount
//   const fetchWishlist = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/cart/wishlist");
//       setWishlist(response.data.wishlist);

//       // Fetch the product details for each item in the wishlist and store in wishlistProducts state
//       const productDetails = [];
//       for (const item of response.data.wishlist) {
//         const productResponse = await axios.get(`/product/${item}`);
//         productDetails.push(productResponse.data.product);
//       }

//       setWishlistProducts(productDetails);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load wishlist");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   // Handle removing an item from wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       console.log("Removing product from wishlist:", productId);
//       await axios.delete(`/cart/removeFromWishlist/${productId}`);
//       toast.success("Product removed from wishlist");
//       // Re-fetch wishlist to update UI
//       fetchWishlist();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to remove product from wishlist");
//     }
//   };

//   const addToCart = async (productId) => {
//     try {
//       const response = await axios.post('/cart/addSingleProduct', { productId });
//       if (response.status === 200) {
//         if (response.data.message === "Product already in cart") {
//           console.log("Product already in cart");
//           removeFromWishlist(productId);
//           fetchWishlist();
//         } else {
//           console.log("Product added to cart");
//           removeFromWishlist(productId);
//           fetchWishlist();
//         }
//       }
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

//   if (wishlist.length === 0) {
//     return <div className="text-center py-4">Your wishlist is empty!</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 flex-col w-full justify-center items-center">
//       <h2 className="text-3xl font-semibold mb-6 text-center">Your Wishlist</h2>
//       <ul className="w-full flex justify-center gap-6">
//         {wishlistProducts.map((item) => (
//           <li
//             key={item._id}
//             className=" bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden relative"
//           >
//             <img
//               src={item.url}
//               alt={item.name}
//               className="w-full h-48 object-cover rounded-t-lg"
//             />
//             <div className="p-2">
//               <h3 className="text-xl font-medium mb-2">{item.name}</h3>
//               <p className="text-md text-gray-700 mb-2">Price: <span className="text-red-600">${item.price}</span></p>
//               <p className="text-sm text-gray-600 mb-2">Category: {item.category}</p>
//               <p className="text-sm text-gray-600 mb-4">Brand: {item.brand}</p>
//               <p className="text-xs text-gray-500 mb-4">{item.description}</p>
//             </div>
//             <div className="flex justify-between px-4 pb-4 gap-6">
//               <button
//                 onClick={() => removeFromWishlist(item._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Remove
//               </button>
//               <button
//                 onClick={() => addToCart(item._id)}
//                 className="bg-slate-400 text-white px-4 py-2 rounded-lg hover:bg-slate-500 transition"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Wishlist;

import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig";
import { toast } from "react-toastify"; // for notifications
import { Link } from "react-router-dom"; // assuming you have a route for product details
import { useCart } from "../CartContext";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext
import { userContext } from "../App";
import { MdOutlineRotateRight } from "react-icons/md";

const Wishlist = () => {
  const { cart, setCart, wishlist, setWishlist } = useCart();
  const { isUserLoggedin, setIsUserLoggedin } = useContext(userContext);
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist items on component mount
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/cart/wishlist");
      setWishlist(response.data.wishlist);
      setIsUserLoggedin(true);
      setIsUserLoggedin(true);

      // Fetch the product details for each item in the wishlist and store in wishlistProducts state
      const productDetails = [];
      for (const item of response.data.wishlist) {
        const productResponse = await axios.get(`/product/${item}`);
        productDetails.push(productResponse.data.product);
      }

      setWishlistProducts(productDetails);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load wishlist");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Handle removing an item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      console.log("Removing product from wishlist:", productId);
      await axios.delete(`/cart/removeFromWishlist/${productId}`);
      toast.success("Product removed from wishlist");
      // Re-fetch wishlist to update UI
      fetchWishlist();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from wishlist");
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await axios.post("/cart/addSingleProduct", {
        productId,
      });
      if (response.status === 200) {
        if (response.data.message === "Product already in cart") {
          console.log("Product already in cart");
          removeFromWishlist(productId);
          fetchWishlist();
        } else {
          console.log("Product added to cart");
          removeFromWishlist(productId);
          fetchWishlist();
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full animate-spin flex items-center justify-center">
          <MdOutlineRotateRight
            size={45}
            style={{color: isDarkMode ? "white" : "blue", paddingTop: "1px"}}
          />
        </div>
        {/* <p className="text-orange-600">Loading products...</p> */}
      </div>
    );
  }

  if (wishlist.length === 0) {
    return <div className="text-center py-4">Your wishlist is empty!</div>;
  }

  return (
    <div
      className={`p-3 flex-col w-full justify-center items-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Wishlist</h2>
      <ul className="w-full flex justify-center gap-6 flex-wrap">
        {wishlistProducts.map((item) => (
          <li
            key={item._id}
            className={`w-1/5 min-w-[16rem] flex flex-col justify-between rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden relative ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-48 object-fit rounded-t-lg"
            />
            <div className="p-2">
              <h3
                className={`text-xl font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.name}
              </h3>
              <p
                className={`text-md mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Price: <span className="text-red-600">${item.price}</span>
              </p>
              <p
                className={`text-sm mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Category: {item.category}
              </p>
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Brand: {item.brand}
              </p>
              <p
                className={`text-xs mb-4 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {item.description}
              </p>
            </div>
            <div className="flex justify-between px-4 pb-4 gap-6">
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
              <button
                onClick={() => addToCart(item._id)}
                className={`text-white px-3 py-2 rounded-lg hover:bg-slate-500 transition ${
                  isDarkMode ? "bg-slate-400" : "bg-slate-400"
                }`}
              >
                Add Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
