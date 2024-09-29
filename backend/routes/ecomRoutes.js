import express from "express"
import {changePassword, forgetPassword, isUserLoggedIn, loginuser, logoutuser, registeruser, verifyOtp} from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
const ecoRoutes=express.Router()

ecoRoutes.get("/",(req,res)=>{
    res.send("hello world")
})    
ecoRoutes.post("/user/register",registeruser)
ecoRoutes.post("/user/login",loginuser)
ecoRoutes.get("/user/loggedIn",authMiddleware,isUserLoggedIn)
ecoRoutes.post("/user/logout",logoutuser)
ecoRoutes.post("/user/forgetPassword",forgetPassword)
ecoRoutes.post("/user/verifyOtp",verifyOtp)
ecoRoutes.post("/user/changePassword",changePassword)
export default ecoRoutes