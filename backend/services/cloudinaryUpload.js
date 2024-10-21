// import { v2 as cloudinary } from "cloudinary"; 
// import "dotenv/config";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function uploadToCloudinary(file) {
//   console.log("Uploading to Cloudinary...");

//   try {
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: "ecommerce",
//       resource_type: "auto",
//     });
    
//     console.log("Upload to Cloudinary done...");
//     console.log(result.secure_url);
    
//     return result.secure_url; // Return the secure URL
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw new Error("Error uploading image to Cloudinary"); // Throw an error to handle in the controller
//   }
// }

// services/cloudinaryUpload.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file) {
  try {
    console.log("Uploading to Cloudinary:", file.path);

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "ecommerce",
      resource_type: "auto",
    });

    console.log("Upload successful:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Error uploading image to Cloudinary");
  }
}
