import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import ecoRoutes from "./routes/ecomRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cookieParser from "cookie-parser"
import { sendMail } from "./services/sendMails.js"

const PORT=process.env.PORT || 5000
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOptions={
    origin:"http://localhost:5173",
    credentials:true,
    method:["GET","POST","PUT","DELETE","OPTIONS","PATCH"],
    allowHeaders:["Authorization"],
}
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/product",productRouter)
app.use("/api",ecoRoutes)

try {
    // MongoDB URI with localhost (creates the DB automatically when data is inserted)
    await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
}
catch(err){
    console.log(err)
}

app.use((err,req,res,next)=>{
    console.log(err.message);
    // sendMail()
    res.status(500).json({message:"Internal server error"});
})