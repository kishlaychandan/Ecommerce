import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadBuffer(file) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ecommerce",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(file.buffer);
  });
}

export async function uploadToCloudinary(file) {
  if (!file) {
    throw new Error("No file provided for upload");
  }

  try {
    let result;

    if (file.buffer) {
      result = await uploadBuffer(file);
    } else if (file.path) {
      result = await cloudinary.uploader.upload(file.path, {
        folder: "ecommerce",
        resource_type: "auto",
      });
    } else {
      throw new Error("Uploaded file is missing buffer or path");
    }

    if (!result?.secure_url) {
      throw new Error("Cloudinary did not return a secure URL");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Error uploading image to Cloudinary");
  }
}
