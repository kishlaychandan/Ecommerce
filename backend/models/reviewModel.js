import mongoose, { Types } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: 'product',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'user',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      default: '',
    },
    images: [{
      type: String, // URLs of uploaded images
    }],
    videos: [{
      type: String, // URLs of uploaded videos
    }]
  },
  { timestamps: true }
);

export const reviewModel = mongoose.model("review", reviewSchema);
