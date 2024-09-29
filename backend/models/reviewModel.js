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
            default: ''
        }
    },
    { timestamps: true }
);
export const reviewModel = mongoose.model("review", reviewSchema);