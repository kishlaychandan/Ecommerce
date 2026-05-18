import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
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
import { userModel } from "./models/userModels.js"

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
    // Allow all origins. Use reflected origin to support credentials.
    origin: true,
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

async function createDefaultAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const existingAdmin = await userModel.findOne({ role: "admin" });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await userModel.create({
            firstName: "Admin",
            lastName: "User",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
        });
        console.log(`Default admin created: ${adminEmail}`);
    } else {
        console.log("Admin user already exists.");
    }
}

try {
    // MongoDB URI with localhost (creates the DB automatically when data is inserted)
    // await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
    await mongoose.connect(process.env.MONGO_URI);
    await createDefaultAdmin();
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