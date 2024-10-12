// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "./axiosConfig";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isReviewFormOpen, setReviewFormOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    // Fetch initial cart and wishlist from the server
    const fetchCartAndWishlist = async () => {
        try {
            const [cartResponse, wishlistResponse] = await Promise.all([
                axios.get("/cart"),
                axios.get("/cart/wishlist"),
            ]);
            // console.log("cart", cartResponse.data.products);
            
            setCart(cartResponse.data.products);
            setWishlist(wishlistResponse.data.wishlist);
        } catch (error) {
            console.error("Error fetching cart and wishlist:", error);
        }
    };
    
    useEffect(() => {
        fetchCartAndWishlist();
        console.log("cart", cart);
        
    }, []);

    const addToCart = async (singleProduct) => {
        try {
            await axios.post("/cart/addSingleProduct", { productId: singleProduct._id });
            fetchCartAndWishlist(); // Refresh cart after adding
        } catch (err) {
            console.error("Error adding product to cart:", err);
        }
    };

    const removeFromCart = async (singleProduct) => {
        try {
            await axios.delete(`/cart/removeSingleProduct/${singleProduct._id}`);
            fetchCartAndWishlist(); // Refresh cart after removal
        } catch (err) {
            console.error("Error removing product from cart:", err);
        }
    };

    const addToWishlist = async (singleProduct) => {
        try {
            await axios.post("/cart/addToWishlist", { productId: singleProduct._id });
            fetchCartAndWishlist(); 
        } catch (err) {
            console.error("Error adding product to wishlist:", err);
        }
    };

    const removeFromWishlist = async (singleProduct) => {
        try {
            await axios.delete(`/cart/removeFromWishlist/${singleProduct._id}`);
            fetchCartAndWishlist(); // Refresh wishlist after removal
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                wishlist,
                setWishlist,
                addToCart,
                removeFromCart,
                addToWishlist,
                removeFromWishlist,
                isInCart,
                setIsInCart,
                isInWishlist,
                setIsInWishlist,
                isReviewFormOpen,
                setReviewFormOpen,
                reviews,
                setReviews,
                fetchCartAndWishlist
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
