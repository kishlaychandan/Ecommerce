
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

// function DisplayProducts({ products }) {
//   const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context

//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const productsPerPage = 4; // Number of products per page

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   // Get current products for the active page
//   const currentProducts = products.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   // Pagination logic to determine page numbers range
//   const getPageNumbers = () => {
//     let startPage, endPage;
//     if (totalPages <= 3) {
//       startPage = 1;
//       endPage = totalPages;
//     } else {
//       startPage = Math.max(currentPage - 1, 1);
//       endPage = Math.min(currentPage + 1, totalPages);
//       if (currentPage === 1) endPage = 3;
//       else if (currentPage === totalPages) startPage = totalPages - 2;
//     }
//     return [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);
//   };

//   // Function to handle page change
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-2 gap-10">
//       {/* Products display */}
//       <div className="flex justify-center flex-wrap gap-6">
//         {currentProducts.map((product) => (
//           <div
//             key={product._id}
//             className={`card w-64 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex-col items-center justify-between ${
//               isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//             } border ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
//           >
//             <Link to={`/products/${product._id}`} className="w-full">
//               <img
//                 src={product.url ? product.url : "https://placehold.co/200x200"}
//                 alt={product.name}
//                 className="w-full h-1/2 object-cover transition duration-300 ease-in-out transform hover:scale-110"
//               />
//             </Link>
//             <div className="m-3 w-full h-1/2 flex flex-col justify-between ">
//               <h3
//                 className={`text-lg font-bold mb-1 transition duration-200 ${
//                   isDarkMode ? "text-yellow-300" : "text-blue-600"
//                 }`}
//               >
//                 {product.name}
//               </h3>
//               <p
//                 className={`italic ${
//                   isDarkMode ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 Category: <span className="font-medium">{product.category}</span>
//               </p>
//               <p
//                 className={`italic ${
//                   isDarkMode ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 Brand: <span className="font-medium">{product.brand}</span>
//               </p>
//               <p className="font-medium">Rating: {product.totalRatings}</p>
//               <p
//                 className={`italic ${
//                   isDarkMode ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 In Stock:{" "}
//                 <span
//                   className={`font-medium ${
//                     product.inStock ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   {product.inStock ? " Yes" : " No"}
//                 </span>
//               </p>
//               <p
//                 className={`text-xl font-bold mt-2 ${
//                   isDarkMode ? "text-yellow-300" : "text-blue-800"
//                 }`}
//               >
//                 {`₹${product.price.toFixed(2)}`}
//               </p>
//               <div className="p-2 w-full flex items-center justify-center mb-3">
//               <Link
//                 to={`/products/${product._id}`}
//                 className={`py-1 px-3 border-blue-700 rounded-lg transition duration-300 ease-in-out text-lg font-medium ${
//                   isDarkMode
//                     ? "bg-white text-slate-900 hover:bg-yellow-200"
//                     : "bg-blue-700 hover:bg-blue-800"
//                 } text-white`}
//               >
//                 View Product
//               </Link>
//             </div>
//             </div>
            
//           </div>
//         ))}
//       </div>

//       {/* Pagination controls */}
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`py-1 px-3 rounded ${
//             currentPage === 1
//               ? "cursor-not-allowed bg-gray-300"
//               : "bg-blue-500 hover:bg-blue-600 text-white"
//           }`}
//         >
//           Prev
//         </button>

//         {/* Page numbers */}
//         {getPageNumbers().map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() => handlePageChange(pageNumber)}
//             className={`py-1 px-3 rounded ${
//               pageNumber === currentPage
//                 ? "bg-blue-600 text-white"
//                 : isDarkMode
//                 ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                 : "bg-gray-200 hover:bg-gray-300"
//             }`}
//           >
//             {pageNumber}
//           </button>
//         ))}

//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`py-1 px-3 rounded ${
//             currentPage === totalPages
//               ? "cursor-not-allowed bg-gray-300"
//               : "bg-blue-500 hover:bg-blue-600 text-white"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DisplayProducts;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext
import { FaStar } from "react-icons/fa6"; // Import FaStar icon

function DisplayProducts({ products }) {
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 4; // Number of products per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get current products for the active page
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Pagination logic to determine page numbers range
  const getPageNumbers = () => {
    let startPage, endPage;
    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(currentPage - 1, 1);
      endPage = Math.min(currentPage + 1, totalPages);
      if (currentPage === 1) endPage = 3;
      else if (currentPage === totalPages) startPage = totalPages - 2;
    }
    return [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to render stars based on ratings
  const renderStars = (rating) => {
    const starsCount = Math.round(rating); // Round the rating to the nearest whole number
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-${index < starsCount ? 'yellow' : 'gray'}-500`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-2 gap-10">
      {/* Products display */}
      <div className="flex justify-center flex-wrap gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className={` card w-64 min-h-[500px] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex-col items-center justify-between ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            } border ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
          >
            <Link to={`/products/${product._id}`} className="w-full">
              <img
                src={product.url ? product.url : "https://placehold.co/200x200"}
                alt={product.name}
                className="w-full h-1/2 object-cover transition duration-300 ease-in-out transform hover:scale-110"
              />
            </Link>
            <div className="p-3 w-full h-1/2 flex flex-col justify-between ">
              <h3
                className={`text-lg font-bold mb-1 transition duration-200 ${
                  isDarkMode ? "text-yellow-300" : "text-blue-600"
                }`}
              >
                {product.name}
              </h3>
              <p
                className={`italic ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Category: <span className="font-medium">{product.category}</span>
              </p>
              <p
                className={`italic ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Brand: <span className="font-medium">{product.brand}</span>
              </p>
              <p className="font-medium flex items-center gap-2">Rating: <span>{renderStars(product.totalRatings)}</span></p> {/* Display stars here */}
              <p
                className={`italic ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                In Stock:{" "}
                <span
                  className={`font-medium ${
                    product.inStock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.inStock ? " Yes" : " No"}
                </span>
              </p>
              <p
                className={`text-xl font-bold ${
                  isDarkMode ? "text-yellow-300" : "text-blue-800"
                }`}
              >
                {`₹${product.price.toFixed(2)}`}
              </p>
              <div className="flex items-center justify-center mt-4">
              <Link
                  to={`/products/${product._id}`}
                  className={`py-1 px-3 border border-blue-700 rounded-lg transition duration-300 ease-in-out text-md font-medium ${
                    isDarkMode
                      ? "bg-white text-slate-900 hover:bg-yellow-200 hover:text-slate-900 hover:border-yellow-200"
                      : "bg-blue-700 text-white hover:bg-white hover:text-blue-700 hover:border-blue-700"
                  }`}
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-1 px-3 rounded ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-300"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Prev
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`py-1 px-3 rounded ${
              pageNumber === currentPage
                ? "bg-blue-600 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`py-1 px-3 rounded ${
            currentPage === totalPages
              ? "cursor-not-allowed bg-gray-300"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DisplayProducts;
