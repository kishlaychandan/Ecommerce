import { userModel } from "../models/userModels.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/tokenGenerate.js";
export async function registeruser(req, res) {
  try {
    let { firstName, lastName, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    password = hashedPassword;
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
}

export async function loginuser(req, res) {
  const {email,password}=req.body;

  console.log("unique",await bcrypt.hash('abc', 5));
  const user=await userModel.findOne({email})
  console.log(user);
  
  if(!user){
      return res.status(400).json({message:"User not found"})
  }
  const check=await bcrypt.compare(password,user.password);

  if(!check){
      return res.status(400).json({message:"Wrong password"})
  }

  console.log("login");
  //create token
  console.log("token: ", generateToken());
  //login user in
}
