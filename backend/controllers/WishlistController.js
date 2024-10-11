import cartModel from "../models/cartModel.js";
import productModel from "../models/productModels.js";
import {userModel} from "../models/userModels.js";


export async function addToWishlist(req, res) {
    const { productId } = req.body; // Get the product ID from the request body
    const userId = req.user._id; // Get the user's ID from the authentication middleware (req.user should have user details)

    try {
        // Check if the product exists
        const product = await productModel.findById(productId.toString());
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update user's wishlist by adding the product's ObjectId
        const user = await userModel.findById(userId);

        // Check if the product is already in the wishlist
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: "Product already in wishlist" });
            console.log("product already in wishlist");
            
        }

        user.wishlist.push(productId);
        await user.save();

        res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function removeFromWishList(req, res) {
    console.log("inside remove from wishlist");
    
    const { productId } = req.params; 
    const userId = req.user._id;

    console.log("userid",userId,"productid",productId);
    
    try {
        const user = await userModel.findById(userId);

        if (!user.wishlist.includes(productId)) {
            return res.status(404).json({ message: "Product not found in wishlist" });
        }

        // Remove product from wishlist
        user.wishlist = user.wishlist.filter(item => item.toString() !== productId);
        await user.save();

        res.status(200).json({ message: "Product removed from wishlist", wishlist: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getWishlist(req, res) {
    const userId = req.user._id; // Get the user's ID from the authentication middleware
    // console.log("getwishlistRESP", userId);
    console.log("inside get wishlist",userId);
    

    try {
        const user = await userModel.findById(userId);

        console.log("user wishlist");
        
        if (!user) {
            console.log("User not found");
   
        }
        else{
            // console.log("user found");
            // console.log("user wishlist",user.wishlist);
            console.log("user wishlist",);
            
            res.status(200).json({ message: "Wishlist fetched successfully", wishlist: user.wishlist });
            
        }
    }        
    catch (err) {
        console.error("Error in getWishlist:", err); // Better error logging
        res.status(500).json({ message: err.message });
    }
}

