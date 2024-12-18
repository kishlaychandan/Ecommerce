import React, { useContext, useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../App";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext
import { FaHeart } from "react-icons/fa";
import ReviewForm from "../components/ReviewForm";
import { useCart } from "../CartContext";
import Reviews from "../components/Reviews";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isUserLoggedIn } = useContext(userContext);
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context
  
  const [singleProduct, setSingleProduct] = useState({});
  const {
    cart,
    addToCart,
    removeFromCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    setIsInCart,
    isInWishlist,
    setIsInWishlist,
    isReviewFormOpen,
    setReviewFormOpen,
    reviews,
    setReviews,
  } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setSingleProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!singleProduct._id) return;

      try {
        const response = await axios.get(`/product/review/${singleProduct._id}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [singleProduct._id, setReviews]);

  useEffect(() => {
    const checkProductInCartAndWishlist = () => {
      if (!singleProduct || !singleProduct._id) return; // Ensure `_id` exists before proceeding
  
      const productInCart = cart.some(item => item.product?._id === singleProduct._id);
      const productInWishlist = wishlist.some(item => item === singleProduct._id);
  
      if (isInCart !== productInCart) setIsInCart(productInCart);
      if (isInWishlist !== productInWishlist) setIsInWishlist(productInWishlist);
    };
  
    if (singleProduct._id) checkProductInCartAndWishlist();
  }, [singleProduct, cart, wishlist, isInCart, isInWishlist, setIsInCart, setIsInWishlist]);
  
  const handleAddToCart = async () => {
    try {
      await addToCart(singleProduct);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(singleProduct);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleReviewSubmission = () => {
    setReviewFormOpen(false);
  };

  return (
    <div className={`singleProduct pt-6 flex flex-col w-full justify-center items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="w-full md:w-1/2">
        {singleProduct && (
          <div className={`singleProduct flex gap-4 flex-col md:flex-row p-4 rounded-lg items-center ${isDarkMode ? 'bg-gray-800' : 'bg-transparent border-300'}`}>
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                className="w-full max-h-[400px] object-cover rounded-lg"
                src={singleProduct.url}
                alt={singleProduct.name}
              />
            </div>
            {/* Description Section */}
            <div className="right w-full md:w-1/2 flex flex-col gap-8 p-4">
              <div>
                <h2 className="text-xl font-bold">{singleProduct.name}</h2>
                <p><em>Category: </em>{singleProduct.category}</p>
                <p><em>Price: </em>₹ {singleProduct.price}</p>
                <p>Description: {singleProduct.description}</p>
                <p>Brand: {singleProduct.brand}</p>
                <p>In Stock: {singleProduct.inStock ? "Yes" : "No"}</p>
                <p>Inventory: {singleProduct.inventory}</p>
              </div>

              {/* Wishlist and Cart Buttons */}
              <div className="flex gap-6 w-auto">
                {isUserLoggedIn ? (
                  isInWishlist ? (
                    <button
                      className="my-2 md:my-0 md:mr-2 bg-slate-400 text-white p-2 rounded"
                      onClick={() => removeFromWishlist(singleProduct)}
                    >
                      <FaHeart style={{ color: "red" }} />
                    </button>
                  ) : (
                    <button
                      className="my-2 md:my-0 md:mr-2 bg-slate-400 text-white p-2 rounded"
                      onClick={handleAddToWishlist}
                    >
                      <FaHeart style={{ color: "white" }} />
                    </button>
                  )
                ) : (
                  <button
                    className="my-2 md:my-0 md:mr-2 bg-slate-400 text-white p-2 rounded"
                    onClick={() => navigate(`/login?back_to=/product/${singleProduct._id}`)}
                  >
                    <FaHeart style={{ color: "white" }} />
                  </button>
                )}

                {isUserLoggedIn ? (
                  isInCart ? (
                    <button
                      className="bg-red-600 text-white p-2 pl-3 pr-3 rounded"
                      onClick={() => removeFromCart(singleProduct)}
                    >
                      Remove Cart
                    </button>
                  ) : (
                    <button
                      className="bg-green-600 text-white p-2 pl-3 pr-3 rounded"
                      onClick={handleAddToCart}
                    >
                      Add Cart
                    </button>
                  )
                ) : (
                  <button
                    className="bg-green-600 text-white p-2 pl-3 pr-3 rounded"
                    onClick={() => navigate(`/login?back_to=/product/${singleProduct._id}`)}
                  >
                    Add Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {isReviewFormOpen && (
        <ReviewForm
          productId={singleProduct._id}
          onClose={() => setReviewFormOpen(false)}
          setReviewFormOpen={setReviewFormOpen}
          onReviewSubmitted={handleReviewSubmission}
        />
      )}

      <Reviews reviews={reviews} setReviewFormOpen={setReviewFormOpen} />
    </div>
  );
}

export default SingleProduct;
