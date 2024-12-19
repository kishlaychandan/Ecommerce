import React, { useState, useContext } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { ImMenu, ImMenu2 } from "react-icons/im";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

const Sidebar = ({ onApplyFilters }) => {
  const { isDarkMode } = useContext(ThemeContext); // Access isDarkMode from context
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    category: "",
    priceMin: 0,
    priceMax: 0,
    rating: "",
    sortBy: "",
    sort: "",
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
      [name]: Number(value),
    }));
  };

  // Apply filters on button click
  const handleApplyFilters = () => {
    if (typeof onApplyFilters === "function") {
      onApplyFilters(filters); // Pass filters to the parent component
    } else {
      console.error("onApplyFilters is not a function");
    }
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      brand: "",
      category: "",
      priceMin: 0,
      priceMax: 0,
      rating: "",
      sortBy: "",
      sort: "",
    });
  };

  return (
    <>
      {/* Button to toggle sidebar visibility */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="m-2 rounded absolute top-15 left-2 z-40"
      >
        {isOpen ? (
          <IoIosCloseCircle size={46} className="spin" />
        ) : (
          <ImMenu size={42} />
        )}
      </button>

      {/* Sidebar container */}
      <div
        className={`transition-all ${
          isOpen ? "min-w-[18rem] h-screen p-6" : "w-0 overflow-hidden"
        } ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        }shadow-lg`}
      >
        {isOpen && (
          <div className="flex flex-col w-full h-full gap-4">
          <h2 className="font-bold text-xl mt-10">Filters</h2>
        
          {/* Search by Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Search by Name</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              placeholder="Enter product name"
            />
          </div>
        
          {/* Brand Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={filters.brand}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              placeholder="Enter brand"
            />
          </div>
        
          {/* Category Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              placeholder="Enter category"
            />
          </div>
        
          {/* Price Range */}
          <div>
            <label className="block mb-2 text-sm font-medium">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="priceMin"
                value={filters.priceMin}
                onChange={handlePriceSliderChange}
                className={`w-1/2 p-2 border rounded ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
                placeholder="Min"
              />
              <input
                type="number"
                name="priceMax"
                value={filters.priceMax}
                onChange={handlePriceSliderChange}
                className={`w-1/2 p-2 border rounded ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
                placeholder="Max"
              />
            </div>
            <div className="flex gap-4 items-center mt-4">
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
            </div>
          </div>
        
          {/* Rating Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium">Rating</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={filters.rating}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              placeholder="Minimum rating (0-5)"
            />
          </div>
        
          {/* Sort Options */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">Sort By</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
              >
                <option value="">Select</option>
                <option value="price">Price</option>
                <option value="totalRatings">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">Set Order</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
              >
                <option value="">Select</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        
          {/* Filter Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleClearFilters}
              className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilters}
              className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
        
        )}
      </div>
    </>
  );
};

export default Sidebar;
