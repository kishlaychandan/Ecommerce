import { userModel } from "../models/userModels.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/tokenGenerate.js";
import generateSixDigitRandomNumber from "../utils/otpGenerator.js";
import { sendMail } from "../services/sendMails.js";
import dotenv from "dotenv";
dotenv.config();
//register
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

//login
export async function loginuser(req, res) {
  try {
    console.log("inside login controller");

    // console.log(req.body);

    const { email, password, role } = req.body;
    console.log(email, password, role);

    const checkUser = await userModel.findOne({ email }).exec();
    // console.log(checkUser);

    // if (!checkUser) {
    //   return res.status(400).json({ message: "User not found" });
    // }
    const check = await bcrypt.compare(password, checkUser.password);
    // if (!check) {
    //   return res.status(400).json({ message: "Wrong password" });
    // }
    console.log(checkUser.role, role);

    if (!checkUser || !check || checkUser.role !== role) {
      console.log("wrong credentials");

      return res
        .status(401)
        .json({ message: "User not found, Invalid credentials" });
    } else {
      console.log("correct credentials");
    }
    console.log("now generating token");

    //create token
    // console.log("token: ", generateToken(checkUser));
    const token = await generateToken(checkUser);
    // console.log("token: ", token);

    //login user in

    //how to send token to frontend
    //1. sending token in response body , saving it in localstorage in frontend   X
    // res.status(200).json({
    //   message:"login successful",
    //   token
    // })

    //2. sending token as a server only cookie : esecuring it from Xss attack (cross site scripting attack)
    // res
    //   .cookie("auth_token", token, {
    //     httpOnly: true,
    //     secure: false, //now we working on localhost, http not on https
    //     sameSite: "strict",
    //     maxAge: 3600000,
    //   })
    //   .status(200)
    //   .json({
    //     message: "login successful",
    //   });
    //   console.log("login done");
    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: true, // Use true for HTTPS in production
        sameSite: "none", // Allow cross-site cookies
        maxAge: 3600000,
      })
      .status(200)
      .json({ message: "login successful" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

//logout
export async function logoutuser(req, res) {
  try {
    // res
    //   .clearCookie("auth_token", {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "lax",
    //   })
    //   .status(200)
    //   .json({ message: "user logged out" });
    res
      .clearCookie("auth_token", {
        httpOnly: true,
        secure: true, // Use true for HTTPS
        sameSite: "none",
      })
      .status(200)
      .json({ message: "user logged out" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

//is user logged in

export async function isUserLoggedIn(req, res) {
  // console.log(req);
  res.json({ user: req.user });
}
export async function isAdminLoggedIn(req, res) {
  // console.log(req);
  res.json({ user: req.user });
}

export async function forgetPassword(req, res) {
  try {
    console.log("inside forget password");

    const { email } = req.body;
    console.log(email);

    const subject = "Forget and reset Password";

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else console.log("user found");

    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD);

    const otp = generateSixDigitRandomNumber();
    await sendMail(
      process.env.EMAIL,
      process.env.EMAIL_PASSWORD,
      email,
      subject,
      otp
    );
    console.log("send email in forget pass done");

    await updateOtp(user._id, otp);

    return res.status(200).json({ message: "Otp sent to your email" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
}

export async function verifyOtp(req, res) {
  const { email, otp } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user.otp == otp) {
    return res.status(200).json({ message: "otp verified" });
  } else {
    return res.status(401).json({ message: "Invalid otp" });
  }
}

export async function updateOtp(userId, otp) {
  try {
    const validfor = Date.now() + 300000;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { otp: otp, validfor: validfor },
      { new: true, upsert: false }
    );
  } catch (err) {
    console.log(err);
  }
}

export async function changePassword(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true, upsert: false }
    );
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err.message);
  }
}

export async function getUserDetail(req, res) {
  const { userId } = req.body;
  console.log("inside get user detail");

  console.log(userId);

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
  }
}

export async function getAllUsers(req, res) {
  try {
    console.log("Fetching users...");

    const users = await userModel.find({ role: "user" }); // Fetch only users, not admins
    const total = await userModel.countDocuments({ role: "user" }); // Total count for pagination

    res.json({ users, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete a user
export async function deleteUser(req, res) {
  const { userId } = req.params;

  try {
    console.log("inside delete user");

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      console.log("User not found");

      return res.status(404).json({ message: "User not found" });
    } else {
      console.log("user found to delete");
    }
    console.log("user deleted successfully", deletedUser);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
