import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import ecoRoutes from "./routes/ecomRoutes.js"
import productRouter from "./routes/productRoutes.js"
import couponRouter from "./routes/couponRouter.js"
import cookieParser from "cookie-parser"
import { sendMail } from "./services/sendMails.js"
import authRouter from "./routes/authRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import expressRateLimit from "express-rate-limit"
import aboutRouter from "./routes/aboutRouter.js"
import faqRouter from "./routes/faqRoutes.js"
import OrderRouter from "./routes/orderRouter.js"

const PORT=process.env.PORT || 3000;
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const limiter=expressRateLimit({
    windowMs:15*60*1000,
    max:1000,
    message:"Too many requests from this IP, please try again after 15 minutes",
    headers:true,
})

const corsOptions = {
    // origin:"http://localhost:5173",
    // origin: "https://ecommerce-two-jade.vercel.app", // Remove the trailing slash
    origin: function (origin, callback) {
        const allowedOrigins = ["https://ecommerce-two-jade.vercel.app", "http://localhost:5173"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(limiter)

app.use("/api/check", authRouter);
app.use("/api/product",productRouter)
app.use("/api",ecoRoutes)
app.use("/api/coupon",couponRouter)
app.use("/api/cart",cartRouter)
app.use("/api/about",aboutRouter)
app.use('/api/faqs', faqRouter);
app.use('/api/orders', OrderRouter)
app.use('/api/coupons',couponRouter)
try {
    // MongoDB URI with localhost (creates the DB automatically when data is inserted)
    // await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
    await mongoose.connect(process.env.MONGO_URI);
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