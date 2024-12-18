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
          <IoIosCloseCircle size={50} className="spin" />
        ) : (
          <ImMenu size={50} />
        )}
      </button>

      {/* Sidebar container */}
      <div
        className={`transition-all ${
          isOpen ? "min-w-[18rem] h-full p-6" : "w-0 overflow-hidden"
        } ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        }shadow-lg`}
      >
        {isOpen && (
          <div>
            <h2 className="font-bold text-xl mb-2 mt-9">Filters</h2>

            {/* Search by Name */}
            <div className="mb-2">
              <label className="block mb-1">Search by Name</label>
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
            <div className="mb-2">
              <label className="block mb-1">Brand</label>
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
            <div className="mb-2">
              <label className="block mb-1">Category</label>
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

            {/* Price Range Slider */}
            <div className="mb-2">
              <label className="block mb-1">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handlePriceSliderChange}
                  className={`w-1/2 p-2 border rounded ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                  }`}
                  placeholder="Min"
                />
                <input
                  type="number"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handlePriceSliderChange}
                  className={`w-1/2 p-2 border rounded ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                  }`}
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
            <div className="mb-2">
              <label className="block mb-1">Rating</label>
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

            {/* Sort By Filter */}
            <div className="flex gap-2 justify-between">
              <div className="mb-2">
                <label className="block mb-1">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <option value="">Select</option>
                  <option value="price">Price</option>
                  <option value="totalRatings">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>

              {/* Sort Order Filter */}
              <div className="mb-2">
                <label className="block mb-1">Set Order</label>
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <option value="">Select</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleClearFilters}
                className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
              >
                clear
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
