import mongoose from "mongoose";

const userFileSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true  
    },
    otp:{
        type:String,
        default:null
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        }
    ]
},

{
    timestamps:true
}

);

export const userModel=mongoose.model("users",userFileSchema)