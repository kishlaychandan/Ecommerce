import jwt from "jsonwebtoken"
import "dotenv/config"
import { userModel } from "../models/userModels.js";

async function authMiddleware(req, res, next) {   
    try{
        console.log("user auth middleware");
        

        const { auth_token }=req.cookies;
        console.log("auth-token",auth_token);
        console.log("gets auth token wait for check ");
        

        const decodedToken = jwt.verify(auth_token, process.env.SECRET);
        // console.log("decodedToken",decodedToken);
        console.log("check1, wait for check 2");
        
        const loggedInUser=await userModel.findById(decodedToken.userId);
        if(!loggedInUser){
            console.log("check2, ait for check 3");
            
            return res.status(401).json({message:"user not found"});
        }
        else{
            console.log("check2, wait for check 3");
        }
        if(loggedInUser.role=="user"){
            console.log("user role found");
        }
        if(loggedInUser.role!="user"){
            console.log("check3");
            
            return res.status(401).json({message:"user role not found"});
        }
        else{
            console.log("check3");
        }

        req.user=loggedInUser;
        console.log(req.user);
        
        console.log("auth completed");
        
        next();
    }
    catch(err){ 
        res.status(401).json({message:"user not found"});
        // console.log(err.message);
    }
}
export default authMiddleware