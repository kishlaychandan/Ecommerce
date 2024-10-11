// src/components/ReviewForm.js
import axios from "../axiosConfig";
import { useState } from "react";

function ReviewForm({ productId, onClose,onReviewSubmitted }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      await axios.post(`/product/review/${productId}`, formData);
      alert("Review submitted successfully");
      onClose(); // Close the review modal
      onReviewSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto absolute top-1/4 left-1/4 ">
      <h2 className="text-lg font-semibold mb-4">Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full h-24 resize-none"
            placeholder="Write your comment here..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
