import { reviewModel } from "../models/reviewModel.js"; 
import { uploadToCloudinary } from "../services/cloudinaryUpload.js"; 
import mongoose, { Types } from "mongoose";
import productModel from "../models/productModels.js";

export async function createReview(req, res) {
  try {
    console.log("inside create review");
    
    const { productId } = req.params; 
    const { rating, comment } = req.body; 

    const imageUrls = [];
    const videoUrls = [];

    // Handle image uploads
    if (req.files && req.files.image) {
      for (let i = 0; i < req.files.image.length; i++) {
        const imageUrl = await uploadToCloudinary(req.files.image[i]); 
        imageUrls.push(imageUrl);
      }
    }

    // Handle video uploads
    if (req.files && req.files.video) {
      for (let i = 0; i < req.files.video.length; i++) {
        const videoUrl = await uploadToCloudinary(req.files.video[i]); 
        videoUrls.push(videoUrl);
      }
    }

    console.log("check 1");
    
    const newReview = await reviewModel.create({
      product: productId,
      user: req.user._id,
      rating,
      comment,
      images: imageUrls,
      videos: videoUrls,
    });
    console.log("review created successfully", newReview);
    

    console.log("check 2");
  
    console.log("try to find average rating of product");
    
    const reviews = await reviewModel.find({ product: productId });
    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRatings / reviews.length;

    // Update the product's total rating
    console.log("try to find total rating of product");
    
    const product = await productModel.findByIdAndUpdate(productId, { totalRatings: averageRating });
    console.log("updated product successfully", product);
    
    console.log("review created successfully", newReview, averageRating);
    
    res.status(201).json({ message: "Review created successfully", review: newReview, averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// Function to get reviews by product ID
export const getReviewsByProductId = async (req, res) => {
  console.log("inside get reviews by product id");
  
  const { productId } = req.params;

  if (!Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  try {
    const reviews = await reviewModel.find({ product: productId }); 

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this product." });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Handle deleting a review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await reviewModel.deleteOne({ _id: reviewId });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};
