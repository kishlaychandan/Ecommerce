import express from "express"
import {addRating, addToWishList, createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct} from "../controllers/productControllers.js"
import upload from "../middlewares/upload.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import { createReview,deleteReview,getReviewsByProductId } from "../controllers/reviewControllers.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"
const productRouter=express.Router()

productRouter.get("/",(req,res)=>{
    res.status(200).send("hello world")
})    

productRouter.post("/",adminMiddleware, upload.single("url"),createProduct)
productRouter.get("/getproduct",getAllProducts)
productRouter.get("/:id",getSingleProduct)
productRouter.delete("/deleteproduct/:id",adminMiddleware,deleteProduct)
productRouter.put("/updateproduct/:id",adminMiddleware,upload.single("url"),updateProduct)
productRouter.post("/addToWishList/:productId",authMiddleware,addToWishList)
// productRouter.post("/rating",authMiddleware,addRating)


productRouter.post("/review/:productId", authMiddleware, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createReview);
productRouter.get('/review/:productId', getReviewsByProductId);
productRouter.delete("/reviews/:reviewId", deleteReview);

export default productRouter