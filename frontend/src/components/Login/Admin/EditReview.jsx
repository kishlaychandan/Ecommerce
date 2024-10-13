import React, { useState, useEffect } from 'react';
import axios from '../../../axiosConfig'; 
import { useParams } from 'react-router-dom';

const EditReview = () => {
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [reviews, setReviews] = useState([]); 
  const [loading, setLoading] = useState(false); 

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get("/product/getproduct");
            console.log(response.data);
            setProducts(response.data.products);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    fetchProducts();
  }, []);

  // Fetch reviews for the selected product
  const fetchReviews = async (productId) => {
    setLoading(true);
    try {
        setReviews([]); // Clear the reviews array before fetching
        const response = await axios.get(`/product/review/${productId}`);
        setReviews(response.data.reviews);
    } catch (error) {
        console.log("Error fetching reviews:", error);
    }
    setLoading(false);
  };

  // Handle selecting a product
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    fetchReviews(product._id); 
  };

  // Handle deleting a review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await axios.delete(`/product/reviews/${reviewId}`);
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      alert('Review deleted successfully.');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete the review.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>

      {/* Product List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Select a Product:</h3>
        <ul className="space-y-2">
          {products && Array.isArray(products) ? (
            products.map((product) => (
              <li key={product._id}>
                <button
                  onClick={() => handleProductSelect(product)}
                  className={`w-full text-left p-3 rounded-lg transition duration-200 ease-in-out 
                    ${selectedProduct?._id === product._id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'} `}
                >
                  {product.name} 
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No products available</li>
          )}
        </ul>
      </div>

      {/* Reviews for the Selected Product */}
      {selectedProduct && (
        <div className="mt-4">
          <h3 className="text-2xl font-semibold text-blue-700">Reviews For: {selectedProduct.name}</h3>
          {loading ? (
            <p className="text-gray-600">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <div className="flex flex-wrap gap-4 justify-center">
              {reviews.map((review) => (
                <div key={review._id} className="w-1/3 p-2 max-w-[320px] min-w-[260px]">
                  <div className="border border-gray-300 p-4 rounded-lg flex-col text-center justify-center items-center bg-gray-50 shadow-sm">
                    <p className="font-medium"><strong>User:</strong> {review.user?.name || 'Anonymous'}</p>
                    <p><strong>Rating:</strong> {review.rating} / 5</p>
                    <p className="mb-2"><strong>Comment:</strong> {review.comment}</p>

                    <div className="m-2 flex justify-evenly flex-wrap">
                        {/* Show images if available */}
                    {review.images?.length > 0 && (
                      <div className="mb-2">
                        <strong>Images:</strong>
                        <div className="flex space-x-2">
                          {review.images.map((image, idx) => (
                            <img key={idx} src={image} alt="Review" className="w-20 h-20 object-cover rounded" />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show videos if available */}
                    {review.videos?.length > 0 && (
                      <div className="mb-2">
                        <strong>Videos:</strong>
                        <div className="flex space-x-2">
                          {review.videos.map((video, idx) => (
                            <video key={idx} controls className="w-20 h-20 rounded">
                              <source src={video} type="video/mp4" />
                            </video>
                          ))}
                        </div>
                      </div>
                    )}
                    </div>

                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews found for this product.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EditReview;
