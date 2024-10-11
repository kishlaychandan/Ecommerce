// import React, { useContext } from "react";
// import { useCart } from "../CartContext"; // Adjust the import according to your context file
// import PaymentHandler from "../components/PaymentHandler";

// const Checkout = () => {
//     const { cart } = useCart(); // Accessing cart from context

//     // Calculate total price function
//     const calculateTotalPrice = () => {
//         if (!Array.isArray(cart)) {
//             console.error("Cart is not an array:", cart);
//             return { subtotal: 0, gst: 0, deliveryCharge: 0, total: 0 }; // Return zeros if cart is not an array
//         }

//         const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//         const gst = (subtotal * 0.18); // Assuming GST is 18%
//         const deliveryCharge = 50; // Set a fixed delivery charge
//         const total = subtotal + gst + deliveryCharge;
//         return { subtotal, gst, deliveryCharge, total };
//     };

//     const { subtotal, gst, deliveryCharge, total } = calculateTotalPrice();

//     return (
//         <div className="checkout  mx-auto p-12 bg-white shadow-md ">
//             <h2 className="text-2xl font-bold mb-4">Checkout</h2>
//             <div className="checkout-details">
//                 <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
//                 <div className="space-y-4">
//                     {cart.length === 0 ? (
//                         <p>Your cart is empty.</p>
//                     ) : (
//                         cart.map((item) => (
//                             <div key={item.product._id} className="cart-item p-4 border rounded-md shadow-sm bg-gray-50">
//                                 <h4 className="text-lg font-medium">{item.product.name}</h4>
//                                 <p className="text-gray-700">Quantity: {item.quantity}</p>
//                                 <p className="text-gray-700">Price: ₹{item.product.price.toFixed(2)}</p>
//                             </div>
//                         ))
//                     )}
//                 </div>
//                 {cart.length > 0 && (
//                     <div className="totals mt-6 p-4 border-t border-gray-300">
//                         <p className="flex justify-between">
//                             <span>Subtotal:</span>
//                             <span>₹{subtotal.toFixed(2)}</span>
//                         </p>
//                         <p className="flex justify-between">
//                             <span>GST (18%):</span>
//                             <span>₹{gst.toFixed(2)}</span>
//                         </p>
//                         <p className="flex justify-between">
//                             <span>Delivery Charge:</span>
//                             <span>₹{deliveryCharge.toFixed(2)}</span>
//                         </p>
//                         <h3 className="text-lg font-bold flex justify-between mt-4">
//                             <span>Total:</span>
//                             <span>₹{total.toFixed(2)}</span>
//                         </h3>
//                     </div>
//                 )}
//             </div>
//             {cart.length > 0 && (
//                 <PaymentHandler total={total} onSuccess={() => alert("Payment successful!")} />
                
//             )}
//         </div>
//     );
// };

// export default Checkout;

import React, { useContext } from "react";
import { useCart } from "../CartContext"; // Adjust the import according to your context file
import PaymentHandler from "../components/PaymentHandler";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

const Checkout = () => {
    const { cart } = useCart(); // Accessing cart from context
    const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context

    // Calculate total price function
    const calculateTotalPrice = () => {
        if (!Array.isArray(cart)) {
            console.error("Cart is not an array:", cart);
            return { subtotal: 0, gst: 0, deliveryCharge: 0, total: 0 }; // Return zeros if cart is not an array
        }

        const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const gst = subtotal * 0.18; // Assuming GST is 18%
        const deliveryCharge = 50; // Set a fixed delivery charge
        const total = subtotal + gst + deliveryCharge;
        return { subtotal, gst, deliveryCharge, total };
    };

    const { subtotal, gst, deliveryCharge, total } = calculateTotalPrice();

    return (
        <div
            className={`checkout mx-auto p-12 shadow-md ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
        >
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="checkout-details">
                <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
                <div className="space-y-4">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.product._id}
                                className={`cart-item p-4 border rounded-md shadow-sm ${
                                    isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300 text-black"
                                }`}
                            >
                                <h4 className="text-lg font-medium">{item.product.name}</h4>
                                <h6 className="">Quantity: {item.quantity}</h6>
                                <p className="">Price: ₹{item.product.price.toFixed(2)}</p>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div
                        className={`totals mt-6 p-4 border-t ${
                            isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-50"
                        }`}
                    >
                        <p className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>GST (18%):</span>
                            <span>₹{gst.toFixed(2)}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Delivery Charge:</span>
                            <span>₹{deliveryCharge.toFixed(2)}</span>
                        </p>
                        <h3 className="text-lg font-bold flex justify-between mt-4">
                            <span>Total:</span>
                            <span>₹{total.toFixed(2)}</span>
                        </h3>
                    </div>
                )}
            </div>
            {cart.length > 0 && (
                <PaymentHandler total={total} onSuccess={() => alert("Payment successful!")} />
            )}
        </div>
    );
};

export default Checkout;
