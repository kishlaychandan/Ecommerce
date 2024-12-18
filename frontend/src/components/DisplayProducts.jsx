import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext
import { FaStar } from "react-icons/fa6"; // Import FaStar icon
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

function DisplayProducts({ products }) {
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 4; // Number of products per page
  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

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
    return [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderStars = (rating) => {
    const starsCount = Math.round(rating);
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < starsCount ? "text-orange-500" : "text-gray-500"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start w-full gap-10 p-4">
      {/* Products Grid */}
      <div className="w-full flex flex-wrap justify-center gap-4">
        {currentProducts.map((product) => {
          let discountPercentage = 10; // Random 10-50%
          if(product.price>200) discountPercentage=15
          const originalPrice = Math.round(
            product.price + (product.price * discountPercentage) / 100
          );

          return (
            <div
              key={product._id}
              className={`card h-[400px] max-w-64 flex flex-col rounded-lg overflow-hidden transition-transform transform ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <Link
                to={`/products/${product._id}`}
                className="relative flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="h-2/3 relative w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.url || "https://placehold.co/200x200"}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 hover:scale-110"
                  />
                </div>

                {/* Product Details */}
                <div
                  className={`h-1/4 w-full p-4 flex-grow flex flex-col ${
                    isDarkMode ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-1 truncate ${
                      isDarkMode ? "text-white" : "text-teal-600"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <div className="absolute top-2 right-2 p-1 rounded-md bg-gray-100">
                    {renderStars(product.totalRatings)}
                  </div>
                  <p
                    className={`mt-2 font-semibold flex justify-between ${
                      isDarkMode ? "text-white" : "text-teal-600"
                    }`}
                  >
                      Rs. {product.price}
                      <span className="line-through text-md ml-3 text-gray-500">
                        Rs. {originalPrice}
                      </span>
                    <span className="text-red-500 text-sm">
                      ({discountPercentage}% off)
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-2 px-3 rounded ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-300"
              : "bg-blue-800 hover:bg-blue-600 text-white"
          }`}
        >
          <IoArrowBack />
        </button>

        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`py-1 px-3 rounded ${
              pageNumber === currentPage
                ? "bg-blue-300 text-white hover:bg-blue-600 "
                : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200  hover:bg-blue-300"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`py-2 px-3 rounded ${
            currentPage === totalPages
              ? "cursor-not-allowed bg-gray-300"
              : "bg-blue-800 hover:bg-blue-600 text-white"
          }`}
        >
          <IoArrowForward />
        </button>
      </div>
    </div>
  );
}

export default DisplayProducts;
