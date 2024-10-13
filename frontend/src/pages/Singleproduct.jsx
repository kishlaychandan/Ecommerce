// import React, { useContext, useEffect, useState } from "react";
// import axios from "../axiosConfig";
// import { useNavigate, useParams } from "react-router-dom";
// import { userContext } from "../App";
// import { FaHeart } from "react-icons/fa";
// import ReviewForm from "../components/ReviewForm";
// import { useCart } from "../CartContext";
// import Reviews from "../components/Reviews";

// function SingleProduct() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { user, isUserLoggedIn } = useContext(userContext);
    
//     const [singleProduct, setSingleProduct] = useState({});
//     const { 
//         cart, 
//         addToCart, 
//         removeFromCart, 
//         wishlist, 
//         addToWishlist, 
//         removeFromWishlist, 
//         isInCart, 
//         setIsInCart, 
//         isInWishlist, 
//         setIsInWishlist, 
//         isReviewFormOpen, 
//         setReviewFormOpen, 
//         reviews, 
//         setReviews 
//     } = useCart();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`/product/${id}`);
//                 setSingleProduct(response.data.product);
//             } catch (error) {
//                 console.log("Error fetching product data:", error);
//             }
//         };
//         fetchData();
//     }, [id]);

//     // Fetch product reviews
//     const fetchReviews = async () => {
//         if (!singleProduct._id) return;

//         try {
//           setReviews([]); // Clear the reviews array before fetching
//             const response = await axios.get(`/product/review/${singleProduct._id}`);
//             setReviews(response.data.reviews);
//         } catch (error) {
//             console.log("Error fetching reviews:", error);
//         }
//     };

//     useEffect(() => {
//         fetchReviews(); // Fetch reviews whenever the single product changes
//     }, [singleProduct._id]);

//     // Check if product is in cart or wishlist on mount
//     useEffect(() => {
//         const checkProductInCartAndWishlist = () => {
//             const productInCart = cart.find(item => item.product._id === singleProduct._id);
//             const productInWishlist = wishlist.find(item => item === singleProduct._id);
            
//             setIsInCart(!!productInCart);
//             setIsInWishlist(!!productInWishlist);
//         };
//         if (singleProduct._id) checkProductInCartAndWishlist();
//     }, [singleProduct._id, cart, wishlist]);

//     const handleAddToCart = async (singleProduct) => {
//         await addToCart(singleProduct);
//     };

//     const handleAddToWishlist = async (singleProduct) => {
//         await addToWishlist(singleProduct);
//     };

//     const handleReviewSubmission = () => {
//         fetchReviews(); // Refetch reviews after submitting a new review
//         setReviewFormOpen(false); // Close the review form
//     };

//     return (
//         <>
//             <div className="singleProduct mt-6 flex flex-col w-full justify-center items-center">
//                 <div className="w-full md:w-1/2">
//                 {singleProduct && (
//                     <div className="singleProduct flex gap-4 flex-col md:flex-row bg-orange-300 p-4 rounded-lg items-center">
//                         {/* Image Section */}
//                         <div className="w-full md:w-1/2">
//                             <img
//                                 className="w-full max-h-[400px] object-cover rounded-lg"
//                                 src={singleProduct.url}
//                                 alt={singleProduct.name}
//                             />
//                         </div>
//                         {/* Description Section */}
//                         <div className="right w-full md:w-1/2 flex flex-col gap-8 p-4">
//                             <div>
//                                 <h2 className="text-xl font-bold">{singleProduct.name}</h2>
//                                 <p><em>Category: </em>{singleProduct.category}</p>
//                                 <p><em>Price: </em>{singleProduct.price}</p>
//                                 <p>Description: {singleProduct.description}</p>
//                                 <p>Brand: {singleProduct.brand}</p>
//                                 <p>In Stock: {singleProduct.inStock}</p>
//                                 <p>Inventory: {singleProduct.inventory}</p>
//                             </div>

//                             {/* Wishlist and Cart Buttons */}
//                             <div className="flex gap-6 w-auto">
//                                 {/* Wishlist Button */}
//                                 {isUserLoggedIn ? (
//                                     isInWishlist ? (
//                                         <button
//                                             className="my-2 md:my-0 md:mr-2 bg-slate-400 text-white p-2 rounded"
//                                             onClick={() => removeFromWishlist(singleProduct)}
//                                         >
//                                             <FaHeart style={{ color: "red" }} />
//                                         </button>
//                                     ) : (
//                                         <button
//                                             className="my-2 md:my-0 md:mr-2 bg-slate-400 text-white p-2 rounded"
//                                             onClick={() => handleAddToWishlist(singleProduct)}
//                                         >
//                                             <FaHeart style={{ color: "white" }} />
//                                         </button>
//                                     )
//                                 ) : (
//                                     <button
//                                         className="my-2 md:my-0 md:mr-2 bg-slate-400 text-white p-2 rounded"
//                                         onClick={() => navigate(`/login?back_to=/product/${singleProduct._id}`)}
//                                     >
//                                         <FaHeart style={{ color: "white" }} />
//                                     </button>
//                                 )}

//                                 {/* Cart Button */}
//                                 {isUserLoggedIn ? (
//                                     isInCart ? (
//                                         <button
//                                             className="bg-red-600 text-white p-2 rounded"
//                                             onClick={() => removeFromCart(singleProduct)}
//                                         >
//                                             Remove from Cart
//                                         </button>
//                                     ) : (
//                                         <button
//                                             className="bg-green-600 text-white p-2 rounded"
//                                             onClick={() => handleAddToCart(singleProduct)}
//                                         >
//                                             Add to Cart
//                                         </button>
//                                     )
//                                 ) : (
//                                     <button
//                                         className="bg-green-600 text-white p-2 rounded"
//                                         onClick={() => navigate(`/login?back_to=/product/${singleProduct._id}`)}
//                                     >
//                                         Add to Cart
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                 </div>
//                 {isReviewFormOpen && (
//                         <ReviewForm
//                             productId={singleProduct._id}
//                             onClose={() => setReviewFormOpen(false)}
//                             setReviewFormOpen={setReviewFormOpen}
//                             onReviewSubmitted={handleReviewSubmission}
//                         />
//                     )}

//                 {/* Review Section */}
//                 <Reviews reviews={reviews} setReviewFormOpen={setReviewFormOpen} />
                
//             </div>
//         </>
//     );
// }

// export default SingleProduct;


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
        console.log("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [id]);

  const fetchReviews = async () => {
    if (!singleProduct._id) return;

    try {
      setReviews([]);
      const response = await axios.get(`/product/review/${singleProduct._id}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [singleProduct._id]);

  useEffect(() => {
    const checkProductInCartAndWishlist = () => {
      const productInCart = cart.find(item => item.product._id === singleProduct._id);
      const productInWishlist = wishlist.find(item => item === singleProduct._id);

      setIsInCart(!!productInCart);
      setIsInWishlist(!!productInWishlist);
    };
    if (singleProduct._id) checkProductInCartAndWishlist();
  }, [singleProduct._id, cart, wishlist]);

  const handleAddToCart = async singleProduct => {
    await addToCart(singleProduct);
  };

  const handleAddToWishlist = async singleProduct => {
    await addToWishlist(singleProduct);
  };

  const handleReviewSubmission = () => {
    fetchReviews();
    setReviewFormOpen(false);
  };

  return (
    <>
      <div className={`singleProduct pt-6 flex flex-col w-full justify-center items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="w-full md:w-1/2">
          {singleProduct && (
            <div className={`singleProduct flex gap-4 flex-col md:flex-row p-4 rounded-lg items-center ${isDarkMode ? 'bg-gray-800' : 'bg-orange-300'}`}>
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
                  <p>In Stock: {singleProduct.inStock}</p>
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
                        onClick={() => handleAddToWishlist(singleProduct)}
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
                        className="bg-red-600 text-white p-2 rounded"
                        onClick={() => removeFromCart(singleProduct)}
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 text-white p-2 rounded"
                        onClick={() => handleAddToCart(singleProduct)}
                      >
                        Add to Cart
                      </button>
                    )
                  ) : (
                    <button
                      className="bg-green-600 text-white p-2 rounded"
                      onClick={() => navigate(`/login?back_to=/product/${singleProduct._id}`)}
                    >
                      Add to Cart
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
    </>
  );
}

export default SingleProduct;
