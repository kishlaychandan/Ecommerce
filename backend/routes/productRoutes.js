import express from "express"
import {createProduct} from "../controllers/productControllers.js"

const productRouter=express.Router()

productRouter.get("/",(req,res)=>{
    res.status(200).send("hello world")
})    

productRouter.post("/",createProduct)

export default productRouter
