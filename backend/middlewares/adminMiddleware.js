// middlewares/adminMiddleware.js
import { userModel } from "../models/userModels.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
async function adminMiddleware(req, res, next){
  try{
    console.log("admin middleware");
    
    const { auth_token }=req.cookies;
    const decodedToken = jwt.verify(auth_token, process.env.SECRET);
    // console.log("decodedToken",decodedToken);
    console.log("decodedToken.userId",decodedToken.userId);
    
    const loggedInUser=await userModel.findById(decodedToken.userId);
    if(!loggedInUser){
      console.log("admin not found");
      
        return res.status(401).json({message:"admin not found"});
    }
    else{
      console.log("admin found");
    }
    if(loggedInUser.role!="admin"){
        console.log("admin role found match");
        return res.status(401).json({message:"admin role not found"});
    }
    else{
      console.log("admin role match");
    }
    req.user=loggedInUser;
    console.log("admin auth completed");
    
    next();
}
catch(err){ 
    res.status(401).json({message:"user not found"});
    // console.log(err.message);
}
  };
  export default adminMiddleware;
  