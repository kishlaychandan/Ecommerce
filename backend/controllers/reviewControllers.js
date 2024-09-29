import { Types } from "mongoose";
// import { userModel } from "../models/userModel.js";
// import { productModel } from "../models/productModel.js";
// import { reviewModel } from "../models/reviewModel.js";
import { userModel } from "../models/userModels.js";
import productModel from "../models/productModels.js";
import { reviewModel } from "../models/reviewModel.js";

const validateReview = async (userId, rating, comment, productId) => {
    const errors = [];
    // userId => validation check
    if (!Types.ObjectId.isValid(userId)) {
        errors.push("Invalid userId");
    } else {
        const isUserExists = await userModel.exists({ _id: userId })
        if (!isUserExists) {
            errors.push("User not found");
        }
    }

    // rating => validation check
    if (isNaN(rating)) {
        errors.push("Invalid rating");
    }
    if (rating < 1 || rating > 5) {
        errors.push("Invalid rating");
    }

    // comment => validation check
    if (comment != undefined && typeof comment !== "string") {
        errors.push("Invalid comment");
    }

    // productId => validation check
    if (!Types.ObjectId.isValid(productId)) {
        errors.push("Invalid productId");
    } else {
        const isProductExists = await productModel.exists({ _id: productId });
        if (!isProductExists) {
            errors.push("Product not found");
        }
    }
    return errors;
}

export const createReview = async (req, res) => {
    const { userId, rating, comment } = req.body;
    const { productId } = req.params;
    const errors = await validateReview(userId, rating, comment, productId);
    if (errors.length == 0) {
        const review = await new reviewModel({ user: userId, rating, comment, product: productId }).save();
        res.status(200).send({ message: 'Review updated successfully', review });
    } else {
        res.status(400).send({ errors });
    }
}

export const getReviewsByProductId = async (req, res) => {
    const { productId } = req.params;
    // productId => validation check
    if (!Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid productId" });
    } else {
        const isProductExists = await productModel.exists({ _id: productId });
        if (!isProductExists) {
            return res.status(404).json({ message: "Product not found" });
        }
    }

    const reviews = await reviewModel.find({ product: productId }).populate('user').populate('product');
    res.status(200).json({ reviews });
}

export const deleteReview = async (req, res) => {
    const {id} = req.params;
    // id => validation check
    // delete that review.
    const review = await reviewModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Review deleted successfully', review });
}