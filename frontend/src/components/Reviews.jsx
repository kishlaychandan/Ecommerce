// import React, { useState } from 'react';

// function Reviews({ reviews, setReviewFormOpen }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const reviewsPerPage = 3;

//   // Calculate total pages
//   const totalPages = Math.ceil(reviews.length / reviewsPerPage);

//   // Get current reviews
//   const indexOfLastReview = currentPage * reviewsPerPage;
//   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
//   const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

//   // Change page
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="reviews w-full mt-6">
//       <button
//         className="m-6 bg-blue-500 text-white p-2 rounded"
//         onClick={() => setReviewFormOpen(true)}
//       >
//         Write a Review
//       </button>

//       {currentReviews.length > 0 ? (
//         <div className="review-list flex justify-center flex-wrap gap-4">
//           {currentReviews.map((review) => (
//             <div key={review._id} className="review w-72 p-4 border rounded shadow-md bg-white">
//               <p className="text-lg">{review.comment}</p>
//               <p className="font-semibold">Rating: {review.rating}</p>
//               <p className="text-sm text-gray-500">Posted by: {review.user}</p>
//               {review.images && review.images.length > 0 && review.images.map((image) => (
//                 <img
//                   key={image}
//                   src={image}
//                   alt="Review Image"
//                   className="w-full h-40 object-cover mt-2"
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center">No reviews available.</p>
//       )}

//       {/* Pagination Controls */}
//       <div className="pagination mt-4 flex justify-center">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             className={`mx-1 p-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Reviews;

import React, { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

function Reviews({ reviews, setReviewFormOpen }) {
  const { isDarkMode } = useContext(ThemeContext);  // Get isDarkMode from context
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`reviews w-full mt-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <button
        className={`m-6 ${isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'} p-2 rounded`}
        onClick={() => setReviewFormOpen(true)}
      >
        Write a Review
      </button>

      {currentReviews.length > 0 ? (
        <div className="review-list flex justify-center flex-wrap gap-4">
          {currentReviews.map((review) => (
            <div 
              key={review._id} 
              className={`review w-72 p-4 border rounded shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <p className="text-lg">{review.comment}</p>
              <p className="font-semibold">Rating: {review.rating}</p>
              <p className="text-sm text-gray-500">Posted by: {review.user}</p>
              {review.images && review.images.length > 0 && review.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="Review Image"
                  className="w-full h-40 object-cover mt-2"
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No reviews available.</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 p-2 border rounded ${currentPage === index + 1 
              ? (isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white') 
              : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200')}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
