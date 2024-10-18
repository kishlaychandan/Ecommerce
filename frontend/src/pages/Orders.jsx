// // components/Orders.jsx
// import React, { useEffect, useState } from "react";
// import axios from "../axiosConfig";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUserOrders = async () => {
//     try {
//       const response = await axios.get("/orders/myorders");
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching user orders:", error);
//       alert("Failed to fetch orders. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserOrders();
//   }, []);

//   if (loading) {
//     return <p>Loading your orders...</p>;
//   }

//   if (orders.length === 0) {
//     return <p>You have no orders yet.</p>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
//       {orders.map((order) => (
//         <div
//           key={order._id}
//           className="border p-4 rounded-lg mb-4 shadow-sm bg-white"
//         >
//           <h2 className="text-xl font-medium">Order ID: {order._id}</h2>
//           <p>Status: {order.orderStatus}</p>
//           <p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
//           <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>
//           <h3 className="mt-2 font-semibold">Products:</h3>
//           <ul className="list-disc list-inside">
//             {order.products.map((item) => (
//               <li key={item.productId._id}>
//                 {item.productId.name} - Quantity: {item.quantity} - Price: ₹
//                 {item.price.toFixed(2)}
//               </li>
//             ))}
//           </ul>
//           <h3 className="mt-2 font-semibold">Shipping Details:</h3>
//           {order.shippingInfo && (
//               <>
//               <p>Address: {order.shippingDetails.address}</p>
//           <p>City: {order.shippingDetails.city}</p>
//           <p>Postal Code: {order.shippingDetails.postalCode}</p>
//           <p>Country: {order.shippingDetails.country}</p>
//               </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext
import ChatBots from "../components/ChatBot/ChatBots";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext); // Access isDarkMode from context

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get("/orders/myorders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      alert("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return <p>You have no orders yet.</p>;
  }

  return (
    <div className={`p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <ChatBots/>
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
      {orders.map((order) => (
        <div
          key={order._id}
          className={`border p-4 rounded-lg mb-4 shadow-sm ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
        >
          <h2 className="text-xl font-medium">Order ID: {order._id}</h2>
          <p>Status: {order.orderStatus}</p>
          <p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
          <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>
          <h3 className="mt-2 font-semibold">Products:</h3>
          <ul className="list-disc list-inside">
            {order.products.map((item) => (
              <li key={item.productId._id}>
                {item.productId.name} - Quantity: {item.quantity} - Price: ₹{item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3 className="mt-2 font-semibold">Shipping Details:</h3>
          {order.shippingInfo && (
            <>
              <p>Address: {order.shippingDetails.address}</p>
              <p>City: {order.shippingDetails.city}</p>
              <p>Postal Code: {order.shippingDetails.postalCode}</p>
              <p>Country: {order.shippingDetails.country}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;
