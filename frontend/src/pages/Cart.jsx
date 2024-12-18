import React, { useEffect, useContext } from "react";
import axios from "../axiosConfig";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import ChatBots from "../components/ChatBot/ChatBots";

function Cart() {
    const navigate = useNavigate();
    const { cart, setCart, fetchCartAndWishlist } = useCart();
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        fetchCartAndWishlist();
    }, []);

    // Check if cart is an array
    if (!Array.isArray(cart)) {
        console.error("Cart is not an array:", cart);
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-semibold">Error: Cart data is not valid.</div>
            </div>
        );
    }

    // Check if cart is empty
    if (cart.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-semibold">Your cart is empty</div>
            </div>
        );
    }

    const increment = async (product) => {
        try {
            const response = await axios.post("/cart/increment", {
                productId: product?.product?._id,
            });
            setCart(response.data.cart.products);
        } catch (err) {
            console.error("Error incrementing product quantity:", err.message);
        }
    };

    const decrement = async (product) => {
        try {
            const response = await axios.post("/cart/decrement", {
                productId: product?.product?._id,
            });
            setCart(response.data.cart.products);
        } catch (err) {
            console.error("Error decrementing product quantity:", err.message);
        }
    };

    return (
        <div className={`max-w-4xl mx-auto p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <ChatBots />
            <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
            {cart.map((product) =>
                product?.product ? ( // Check if product is valid
                    <div key={product.product._id} className={`flex items-center border-b py-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <img
                            src={product.product.url}
                            alt={product.product.name}
                            className="w-24 h-24 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                            <p className="text-lg font-medium">{product.product.name}</p>
                            <p className={`text-sm flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <button
                                    onClick={() => increment(product)}
                                    className="bg-blue-500 text-white px-2 rounded-md"
                                >
                                    +
                                </button>
                                <span className="mx-2">{product.quantity}</span>
                                <button
                                    onClick={() => decrement(product)}
                                    className="bg-red-500 text-white px-2 rounded-md"
                                >
                                    -
                                </button>
                            </p>
                            <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                                Price: ₹{product.product.price}
                            </p>
                            <p>Total: ₹{(product.product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ) : (
                    <div key={product._id} className="text-red-500">
                        Error: Invalid product data
                    </div>
                )
            )}
            <div className="mt-6 text-right text-lg">
                <p>
                    Total Price: ₹
                    {cart
                        .filter((product) => product?.product) // Filter out invalid products
                        .reduce(
                            (acc, product) => acc + product.product.price * product.quantity,
                            0
                        )
                        .toFixed(2)}
                </p>
            </div>
            <div className="mt-6 w-full flex justify-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        navigate("/checkout");
                    }}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;
