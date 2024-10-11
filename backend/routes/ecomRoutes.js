import express from "express"
import {changePassword, deleteUser, forgetPassword, getAllUsers, getUserDetail, isAdminLoggedIn, isUserLoggedIn, loginuser, logoutuser, registeruser, verifyOtp} from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"
const ecoRoutes=express.Router()

ecoRoutes.get("/",(req,res)=>{
    res.send("hello world")
})    
ecoRoutes.post("/user/register",registeruser)
ecoRoutes.post("/user/login",loginuser)
ecoRoutes.get("/user/loggedIn",authMiddleware,isUserLoggedIn)
ecoRoutes.get("/user/adminLoggedIn",adminMiddleware,isAdminLoggedIn)
ecoRoutes.post("/user/logout",logoutuser)
ecoRoutes.post("/user/detail",getUserDetail)
ecoRoutes.post("/user/forgetPassword",forgetPassword)
ecoRoutes.post("/user/verifyOtp",verifyOtp)
ecoRoutes.post("/user/changePassword",changePassword)
ecoRoutes.delete('/user/:userId', deleteUser)
ecoRoutes.get("/user",getAllUsers)
export default ecoRoutes