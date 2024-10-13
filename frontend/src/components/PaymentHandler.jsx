
// // components/PaymentHandler.jsx
// import React, { useState, useEffect, useContext } from "react";
// import axios from "../axiosConfig";
// import { useCart } from "../CartContext";
// import { ThemeContext } from "../ThemeContext"; 

// const PaymentHandler = ({ total, onSuccess }) => {
//   const { cart, setCart } = useCart();
//   const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [discountedPrice, setDiscountedPrice] = useState(total);
//   const [publicCoupons, setPublicCoupons] = useState([]);
//   const [appliedCoupon, setAppliedCoupon] = useState("");
//   const [shippingDetails, setShippingDetails] = useState({
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   });

//   // Fetch public coupons when the component mounts
//   useEffect(() => {
//     const fetchPublicCoupons = async () => {
//       try {
//         const response = await axios.get("/coupons/public");
//         setPublicCoupons(response.data);
//       } catch (error) {
//         console.error("Error fetching public coupons:", error);
//       }
//     };

//     fetchPublicCoupons();
//   }, []);

//   useEffect(() => {
//     const newPrice = total - total * (discount / 100);
//     setDiscountedPrice(newPrice > 0 ? newPrice : 0);
//   }, [discount, total]);

//   async function clearCart() {
//     console.log("Clearing cart...");
    
//     try {
//       const response = await axios.delete("/cart/clear");
//       console.log("Cart cleared successfully:", response.data);
//       setCart([]);
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   }
//   const handlePayment = async () => {
//     if (!shippingDetails.address) {
//       alert("Please enter your shipping address.");
//       return;
//     }

//     if (!discountedPrice || discountedPrice <= 0) {
//       alert("Invalid payment amount.");
//       return;
//     }

//     try {
//       // Optionally, create an order with 'Pending' status before payment
//       // This depends on your business logic
//     } catch (error) {
//       console.error("Error before initiating payment:", error);
//     }

//     const options = {
//       key: "rzp_test_rZUOMEi4ogeBfp", // Replace with your Razorpay key
//       amount: discountedPrice * 100, // Razorpay expects amount in paise
//       currency: "INR",
//       name: "Kishlay Shop",
//       description: "Order Payment",
//       image: "https://via.placeholder.com/150",
//       handler: async (paymentResponse) => {
//         try {
//           // Create the order after successful payment
//           await createOrder(paymentResponse.razorpay_payment_id);
//           // setCart([]);
//           onSuccess();
//           alert("Payment successful! Thank you for your order.");
//         } catch (error) {
//           console.error("Error creating order:", error.message);
//           alert("Error creating order. Please try again.");
//         }
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Customer Address",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   const createOrder = async (paymentId) => {
//     const products = cart.map((item) => ({
//       productId: item.product._id,
//       quantity: item.quantity,
//       price: item.product.price,
//     }));

//     const response = await axios.post("/orders/createorder", {
//       products,
//       totalAmount: Math.round(discountedPrice),
//       paymentId,
//       shippingDetails,
//       notes: "Order placed via Razorpay payment.",
//     });
//     if(response.status === 200){
//       clearCart();
//       setCart([])
//     }
//     else{
//       console.log("Error creating order:", response.data);
//     }
//     console.log("Order created:", response.data);
//   };

//   // Apply the coupon (public or private)
//   const handleApplyCoupon = async () => {
//     if (!couponCode) {
//       alert("Please enter a coupon code.");
//       setDiscount(0);
//       setAppliedCoupon("");
//       return;
//     }

//     try {
//       console.log("couponCode", couponCode);

//       const response = await axios.post("/coupons/apply", { code: couponCode });
//       // setDiscount(response.data.discount); 
//       // setAppliedCoupon(couponCode); 
//       console.log(response.data.discount);

//       setDiscount(response.data.discount);
//       setAppliedCoupon(couponCode);
//       alert(`Coupon applied! Discount: ${response.data.discount}%`);
//     } catch (error) {
//       alert("Invalid coupon code. Please try again.");
//       setDiscount(0);
//       setAppliedCoupon("");
//       console.error("Coupon apply error:", error);
//     }
//   };

//   const handlePublicCouponSelect = (e) => {
//     const selectedCouponCode = e.target.value;
//     setCouponCode(selectedCouponCode);
//     console.log(e.target.value);
//   };

//   const handleShippingChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div
//       className={`p-6 rounded-lg shadow-md ${
//         isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
//       }`}
//     >
//       <h2 className="text-lg font-semibold mb-4">Apply Coupon</h2>
//       <label
//         className={`block text-sm font-medium ${
//           isDarkMode ? "text-gray-300" : "text-gray-700"
//         }`}
//       >
//         Select a Public Coupon
//       </label>
//       <select
//         value={couponCode}
//         onChange={handlePublicCouponSelect}
//         className={`mt-1 p-2 w-full border rounded-lg ${
//           isDarkMode
//             ? "bg-gray-700 border-gray-600 text-white"
//             : "bg-white border-gray-300 text-gray-900"
//         }`}
//       >
//         <option value="">-- Select a Coupon --</option>
//         {publicCoupons.map((coupon) => (
//           <option key={coupon._id} value={coupon.code}>
//             {coupon.code} - {coupon.discount}% off (Expires:{" "}
//             {new Date(coupon.expiresAt).toLocaleDateString()})
//           </option>
//         ))}
//       </select>

//       <div className="mt-4">
//         {/* Input field for public/private coupon */}
//         <input
//           type="text"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//           placeholder="Enter coupon code (public or private)"
//           className={`p-2 w-full border rounded-lg ${
//             isDarkMode
//               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//               : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//           }`}
//         />
//         <button
//           onClick={handleApplyCoupon}
//           className={`mt-2 px-4 py-2 rounded-lg ${
//             isDarkMode
//               ? "bg-blue-600 hover:bg-blue-700 text-white"
//               : "bg-blue-500 hover:bg-blue-600 text-white"
//           }`}
//         >
//           Apply Coupon
//         </button>
//       </div>

//       {/* Shipping Details */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
//         <input
//           type="text"
//           name="address"
//           value={shippingDetails.address}
//           onChange={handleShippingChange}
//           placeholder="Address"
//           className={`p-2 w-full border rounded-lg mt-2 ${
//             isDarkMode
//               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//               : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//           }`}
//           required
//         />
//         <input
//           type="text"
//           name="city"
//           value={shippingDetails.city}
//           onChange={handleShippingChange}
//           placeholder="City"
//           className={`p-2 w-full border rounded-lg mt-2 ${
//             isDarkMode
//               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//               : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//           }`}
//         />
//         <input
//           type="text"
//           name="postalCode"
//           value={shippingDetails.postalCode}
//           onChange={handleShippingChange}
//           placeholder="Postal Code"
//           className={`p-2 w-full border rounded-lg mt-2 ${
//             isDarkMode
//               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//               : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//           }`}
//         />
//         <input
//           type="text"
//           name="country"
//           value={shippingDetails.country}
//           onChange={handleShippingChange}
//           placeholder="Country"
//           className={`p-2 w-full border rounded-lg mt-2 ${
//             isDarkMode
//               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
//               : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//           }`}
//         />
//       </div>

//       {/* Display applied coupon and prices */}
//       <div className="mt-4">
//         {appliedCoupon && (
//           <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
//             Applied Coupon: {appliedCoupon}
//           </p>
//         )}
//         <p
//           className={`${
//             isDarkMode ? "text-gray-300" : "text-gray-700"
//           } mt-2`}
//         >
//           Original Price: ₹{total.toFixed(2)}
//         </p>
//         <p
//           className={`${
//             isDarkMode ? "text-gray-300" : "text-gray-700"
//           } mt-1`}
//         >
//           Discounted Price: ₹{discountedPrice.toFixed(2)}
//         </p>
//       </div>

//       <button
//         onClick={handlePayment}
//         className={`btn btn-primary p-2 rounded-lg mt-4 w-full ${
//           isDarkMode
//             ? "bg-green-700 hover:bg-green-800 text-white"
//             : "bg-green-600 hover:bg-green-700 text-white"
//         }`}
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// };

// export default PaymentHandler;

// components/PaymentHandler.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "../axiosConfig";
import { useCart } from "../CartContext";
import { ThemeContext } from "../ThemeContext";

const PaymentHandler = ({ total, onSuccess }) => {
  const { cart, setCart } = useCart();
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(total);
  const [publicCoupons, setPublicCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchPublicCoupons = async () => {
      try {
        const response = await axios.get("/coupons/public");
        setPublicCoupons(response.data);
      } catch (error) {
        console.error("Error fetching public coupons:", error);
      }
    };

    fetchPublicCoupons();
  }, []);

  useEffect(() => {
    const newPrice = total - total * (discount / 100);
    setDiscountedPrice(newPrice > 0 ? newPrice : 0);
  }, [discount, total]);

  const clearCart = async () => {
    try {
      await axios.delete("/cart/clear");
      setCart([]);
      console.log("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handlePayment = async () => {
    if (!shippingDetails.address) {
      alert("Please enter your shipping address.");
      return;
    }

    if (!discountedPrice || discountedPrice <= 0) {
      alert("Invalid payment amount.");
      return;
    }

    const options = {
      key: "rzp_test_rZUOMEi4ogeBfp", // Replace with your Razorpay key
      amount: discountedPrice * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Kishlay Shop",
      description: "Order Payment",
      image: "https://via.placeholder.com/150",
      handler: async (paymentResponse) => {
        try {
          await createOrder(paymentResponse.razorpay_payment_id);
          clearCart(); // Clear the cart after payment
          alert("Payment successful! Thank you for your order.");
          navigate("/order"); // Redirect to order page
        } catch (error) {
          console.error("Error creating order:", error.message);
          alert("Error creating order. Please try again.");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const createOrder = async (paymentId) => {
    const products = cart.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const response = await axios.post("/orders/createorder", {
      products,
      totalAmount: Math.round(discountedPrice),
      paymentId,
      shippingDetails,
      notes: "Order placed via Razorpay payment.",
    });

    console.log("Order created:", response.data);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      alert("Please enter a coupon code.");
      setDiscount(0);
      setAppliedCoupon("");
      return;
    }

    try {
      const response = await axios.post("/coupons/apply", { code: couponCode });
      setDiscount(response.data.discount);
      setAppliedCoupon(couponCode);
      alert(`Coupon applied! Discount: ${response.data.discount}%`);
    } catch (error) {
      alert("Invalid coupon code. Please try again.");
      setDiscount(0);
      setAppliedCoupon("");
      console.error("Coupon apply error:", error);
    }
  };

  const handlePublicCouponSelect = (e) => {
    const selectedCouponCode = e.target.value;
    setCouponCode(selectedCouponCode);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Apply Coupon</h2>
      <select
        value={couponCode}
        onChange={handlePublicCouponSelect}
        className={`mt-1 p-2 w-full border rounded-lg ${
          isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
        }`}
      >
        <option value="">-- Select a Coupon --</option>
        {publicCoupons.map((coupon) => (
          <option key={coupon._id} value={coupon.code}>
            {coupon.code} - {coupon.discount}% off (Expires:{" "}
            {new Date(coupon.expiresAt).toLocaleDateString()})
          </option>
        ))}
      </select>

      <div className="mt-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className={`p-2 w-full border rounded-lg mt-2 ${
            isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
          }`}
        />
        <button
          onClick={handleApplyCoupon}
          className={`mt-2 px-4 py-2 rounded-lg ${
            isDarkMode ? "bg-blue-600" : "bg-blue-500"
          } text-white`}
        >
          Apply Coupon
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
        {["address", "city", "postalCode", "country"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={shippingDetails[field]}
            onChange={handleShippingChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className={`p-2 w-full border rounded-lg mt-2 ${
              isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Display applied coupon and prices */}
      <div className="mt-4">         {appliedCoupon && (
          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
            Applied Coupon: {appliedCoupon}
          </p>
        )}
        <p
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } mt-2`}
        >
          Original Price: ₹{total.toFixed(2)}
        </p>
        <p
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } mt-1`}
        >
          Discounted Price: ₹{discountedPrice.toFixed(2)}
        </p>
      </div>

      <button
        onClick={handlePayment}
        className={`btn btn-primary p-2 rounded-lg mt-4 w-full ${
          isDarkMode ? "bg-green-700" : "bg-green-600"
        } text-white`}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default PaymentHandler;
