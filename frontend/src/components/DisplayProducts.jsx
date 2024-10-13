// import React from "react";
// import { Link } from "react-router-dom";

// function DisplayProducts({ products }) {
//   console.log(products);
//   return (
//     <div className="flex justify-center flex-wrap gap-6 p-4">
//       {products.map((product) => (
//         <div key={product._id} className="card w-1/4 min-w-[220px] max-w-xs bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex-col items-center justify-center">
//           <Link to={`/products/${product._id}`}>
//             <img 
//               src={product.url ? product.url : "https://placehold.co/200x200"}
//               alt={product.name}
//               className="w-full h-48 object-cover transition duration-300 ease-in-out transform hover:scale-110"
//             />
//           </Link>
//           <div className="p-4 w-full">
//             <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
//             <p className="text-gray-600">Category: <span className="font-medium">{product.category}</span></p>
//             <p className="text-gray-600">Brand: <span className="font-medium">{product.brand}</span></p>
//             <p className="text-gray-600">In Stock: 
//               <span className={`font-medium ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
//                 {product.inStock ? " Yes" : " No"}
//               </span>
//             </p>
//             <p className="text-xl font-bold text-gray-900 mt-2">{`$${product.price.toFixed(2)}`}</p>
//           </div>
//           <div className="px-4 pb-4 w-full flex items-center justify-center">
//             <Link to={`/products/${product._id}`} className="inline-block mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out hover:bg-blue-700">
//               View Product
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DisplayProducts;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

function DisplayProducts({ products }) {
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context

  return (
    <div className="flex justify-center flex-wrap gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className={`card w-1/4 min-w-[220px] max-w-xs rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex-col items-center justify-center ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <Link to={`/products/${product._id}`}>
            <img
              src={product.url ? product.url : "https://placehold.co/200x200"}
              alt={product.name}
              className="w-full h-48 object-cover transition duration-300 ease-in-out transform hover:scale-110"
            />
          </Link>
          <div className="p-4 w-full">
            <h3
              className={`text-xl font-semibold mb-1 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {product.name}
            </h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Category: <span className="font-medium">{product.category}</span>
            </p>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Brand: <span className="font-medium">{product.brand}</span>
            </p>
            <p>Rating: {product.totalRatings}</p>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
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
              className={`text-xl font-bold mt-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {`₹${product.price.toFixed(2)}`}
            </p>
          </div>
          <div className="px-4 pb-4 w-full flex items-center justify-center">
            <Link
              to={`/products/${product._id}`}
              className={`inline-block mt-3 py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              View Product
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayProducts;
