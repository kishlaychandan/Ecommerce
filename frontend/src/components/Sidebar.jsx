// import React, { useState } from 'react';
// import { IoIosCloseCircle } from "react-icons/io";
// import { IoMenu } from "react-icons/io5";
// import { ImMenu2 } from "react-icons/im";
// const Sidebar = ({ onApplyFilters }) => {
//   const [filters, setFilters] = useState({
//     name: '',
//     brand: '',
//     category: '',
//     priceMin: 0, // Initialize to default minimum price
//     priceMax: 0, // Initialize to default maximum price
//     rating: '',
//     sortBy: '',
//     sort: ''
//   });
//   const [isOpen, setIsOpen] = useState(true); // State for sidebar visibility

//   // Handle filter input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   // Handle price slider changes
//   const handlePriceSliderChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: Number(value) // Ensure the value is a number
//     }));
//   };

//   // Apply filters on button click
//   const handleApplyFilters = () => {
//     if (typeof onApplyFilters === 'function') {
//       onApplyFilters(filters);  // Pass the filters to the parent component
//     } else {
//       console.error("onApplyFilters is not a function");
//     }
//   };

//   return (
//     <> 
//     <button 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="  m-2 rounded absolute top-15 left-2 z-50">
//         {isOpen ? <IoIosCloseCircle size={50} className='spin'/> : <ImMenu2 size={50}/>}
//       </button>
//     <div className={`bg-gray-200 h-screen shadow-lg transition-all ${isOpen ? 'w-80 p-6' : 'w-0 overflow-hidden'}`}>
      
//       {isOpen && (
//         <div>
//           <h2 className="font-bold text-xl mb-4 mt-12">Filters</h2>

//           {/* Search by Name */}
//           <div className="mb-4">
//             <label className="block mb-1">Search by Name</label>
//             <input
//               type="text"
//               name="name"
//               value={filters.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Enter product name"
//             />
//           </div>

//           {/* Brand Filter */}
//           <div className="mb-4">
//             <label className="block mb-1">Brand</label>
//             <input
//               type="text"
//               name="brand"
//               value={filters.brand}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Enter brand"
//             />
//           </div>

//           {/* Category Filter */}
//           <div className="mb-4">
//             <label className="block mb-1">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={filters.category}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Enter category"
//             />
//           </div>

//           {/* Price Range Slider */}
//           <div className="mb-4">
//             <label className="block mb-1">Price Range</label>
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 name="priceMin"
//                 value={filters.priceMin}
//                 onChange={handlePriceSliderChange}
//                 className="w-1/2 p-2 border rounded"
//                 placeholder="Min"
//               />
//               <input
//                 type="number"
//                 name="priceMax"
//                 value={filters.priceMax}
//                 onChange={handlePriceSliderChange}
//                 className="w-1/2 p-2 border rounded"
//                 placeholder="Max"
//               />
//             </div>
//             {/* Slider for price range */}
//             <div className="flex gap-4 items-center mt-2">
//               <span>{filters.priceMin}</span>
//               <input
//                 type="range"
//                 name="priceMin"
//                 min="0"
//                 max="1000"
//                 value={filters.priceMin}
//                 onChange={handlePriceSliderChange}
//                 className="w-full"
//               />
//               <input
//                 type="range"
//                 name="priceMax"
//                 min="0"
//                 max="1000"
//                 value={filters.priceMax}
//                 onChange={handlePriceSliderChange}
//                 className="w-full"
//               />
//               <span>{filters.priceMax}</span>
//             </div>
//           </div>

//           {/* Rating Filter */}
//           <div className="mb-4">
//             <label className="block mb-1">Rating</label>
//             <input
//               type="number"
//               step="0.1"
//               name="rating"
//               value={filters.rating}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Minimum rating (0-5)"
//             />
//           </div>

//           {/* Sort By Filter */}
//           <div className="mb-4">
//             <label className="block mb-1">Sort By</label>
//             <select
//               name="sortBy"
//               value={filters.sortBy}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select</option>
//               <option value="price">Price</option>
//               <option value="rating">Rating</option>
//               <option value="name">Name</option>
//             </select>
//           </div>

//           {/* Sort Order Filter */}
//           <div className="mb-4">
//             <label className="block mb-1">Sort Order</label>
//             <select
//               name="sort"
//               value={filters.sort}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select</option>
//               <option value="asc">Ascending</option>
//               <option value="desc">Descending</option>
//             </select>
//           </div>

//           <button
//             onClick={handleApplyFilters}
//             className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
//           >
//             Apply Filters
//           </button>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState, useContext } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { ImMenu, ImMenu2 } from "react-icons/im";
import { ThemeContext } from "../ThemeContext";  // Import ThemeContext

const Sidebar = ({ onApplyFilters }) => {
  const { isDarkMode } = useContext(ThemeContext);  // Access isDarkMode from context
  const [filters, setFilters] = useState({
    name: '',
    brand: '',
    category: '',
    priceMin: 0,
    priceMax: 0,
    rating: '',
    sortBy: '',
    sort: ''
  });
  const [isOpen, setIsOpen] = useState(true);

  // Handle filter input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle price slider changes
  const handlePriceSliderChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number(value)
    }));
  };

  // Apply filters on button click
  const handleApplyFilters = () => {
    if (typeof onApplyFilters === 'function') {
      onApplyFilters(filters);  // Pass filters to the parent component
    } else {
      console.error("onApplyFilters is not a function");
    }
  };

  return (
    <>
      {/* Button to toggle sidebar visibility */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="m-2 rounded absolute top-15 left-2 z-40"
      >
        {isOpen ? <IoIosCloseCircle size={50} className='spin'/> : <ImMenu size={50} />}
      </button>

      {/* Sidebar container */}
      <div className={`transition-all ${isOpen ? 'min-w-[18rem] h-full p-6' : 'w-0 overflow-hidden'} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}shadow-lg`}>
        {isOpen && (
          <div>
            <h2 className="font-bold text-xl mb-4 mt-12">Filters</h2>

            {/* Search by Name */}
            <div className="mb-4">
              <label className="block mb-1">Search by Name</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                placeholder="Enter product name"
              />
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
              <label className="block mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={filters.brand}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                placeholder="Enter brand"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={filters.category}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                placeholder="Enter category"
              />
            </div>

            {/* Price Range Slider */}
            <div className="mb-4">
              <label className="block mb-1">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handlePriceSliderChange}
                  className={`w-1/2 p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                  placeholder="Min"
                />
                <input
                  type="number"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handlePriceSliderChange}
                  className={`w-1/2 p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                  placeholder="Max"
                />
              </div>

              <div className="flex gap-4 items-center mt-2">
                {/* <span>{filters.priceMin}</span> */}
                <input
                  type="range"
                  name="priceMin"
                  min="0"
                  max="100000"
                  value={filters.priceMin}
                  onChange={handlePriceSliderChange}
                  className="w-full"
                />
                <input
                  type="range"
                  name="priceMax"
                  min="0"
                  max="100000"
                  value={filters.priceMax}
                  onChange={handlePriceSliderChange}
                  className="w-full"
                />
                {/* <span>{filters.priceMax}</span> */}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <label className="block mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={filters.rating}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                placeholder="Minimum rating (0-5)"
              />
            </div>

            {/* Sort By Filter */}
            <div className="mb-4">
              <label className="block mb-1">Sort By</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              >
                <option value="">Select</option>
                <option value="price">Price</option>
                <option value="totalRatings">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* Sort Order Filter */}
            <div className="mb-4">
              <label className="block mb-1">Sort Order</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              >
                <option value="">Select</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <button
              onClick={handleApplyFilters}
              className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
