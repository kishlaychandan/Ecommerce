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
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true  
    },
},

{
    timestamps:true
}

);

export const userModel=mongoose.model("users",userFileSchema)