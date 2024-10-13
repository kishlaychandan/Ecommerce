import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addProductToCart, getUserCart, removeSingleProductFromCart,decrementProductQuantity, incrementProductQuantity, clearUserCart } from "../controllers/cartController.js";
import { addToWishlist, getWishlist, removeFromWishList } from "../controllers/WishlistController.js";

const cartRouter = Router();

cartRouter.post("/addSingleProduct",authMiddleware, addProductToCart);
cartRouter.delete("/clear",authMiddleware,clearUserCart)
cartRouter.delete("/removeSingleProduct/:productId",authMiddleware, removeSingleProductFromCart);
cartRouter.get("/",authMiddleware,getUserCart);
cartRouter.post("/decrement", authMiddleware, decrementProductQuantity);
cartRouter.post("/increment", authMiddleware, incrementProductQuantity);
cartRouter.post("/addToWishlist", authMiddleware, addToWishlist);
cartRouter.delete("/removeFromWishlist/:productId", authMiddleware, removeFromWishList);
cartRouter.get("/wishlist", authMiddleware, getWishlist);
export default cartRouter