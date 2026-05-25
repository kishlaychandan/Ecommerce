import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";

function Review({ productId, user }) {
  const [rating, setRating] = useState(1); // Default rating value
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/review/${productId}`);
        setReviews(res.data.reviews || []); // Ensure that reviews is always an array
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Assuming you are storing token in localStorage
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = { userId: user._id, rating, comment };

      // API call to create a review
      const res = await axios.post(`/api/review/${productId}`, data, config);
      setReviews((prevReviews) => [res.data.review, ...prevReviews]);
      setComment("");
      setRating(1); // Reset the rating to 1 after submission
    } catch (err) {
      console.error("Error submitting review", err);
      setError("Could not submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const token = localStorage.getItem("token"); // Assuming you are storing token in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API call to delete review
      await axios.delete(`/api/review/${reviewId}`, config);
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
    } catch (err) {
      console.error("Error deleting review", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Review form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 mb-4 w-full"
          required
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label className="block mb-2">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full mb-4"
          rows="4"
          placeholder="Enter your comment"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Display Reviews */}
      <h3 className="text-lg font-semibold mb-4">Reviews for this product:</h3>
      {reviews.length === 0 ? ( // Safeguard length check
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border p-4 mb-4">
            <p>
              <strong>User:</strong> {review.user.name}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating} / 5
            </p>
            <p>
              <strong>Comment:</strong> {review.comment}
            </p>

            {/* Delete review button (only for the current user) */}
            {user && user._id === review.user._id && (
              <button
                onClick={() => handleDelete(review._id)}
                className="text-red-500 mt-2"
              >
                Delete Review
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Review;
