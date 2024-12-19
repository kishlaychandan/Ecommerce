import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig";
import DisplayProducts from "./DisplayProducts";
import BannerCarousel from "./BannerCarousel";
import Sidebar from "./Sidebar";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext
import { useCategories } from "../CategoriesContext.jsx"; // Import CategoriesContext
import { MdOutlineRotateRight } from "react-icons/md";

function Products({ page }) {
  const { isDarkMode } = useContext(ThemeContext); // Get isDarkMode from context
  const [products, setProducts] = useState([]); // Original products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const { searchTerm, category, setCategory } = useCategories(); // Get category from CategoriesContext
  const [error, setError] = useState(null);

  console.log("isDarkMode", isDarkMode);

  // Fetch all products when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/product/getproduct");
        console.log(response.data);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filteredProducts
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      }
    }
    fetchData();
  }, []);

  // Fetch products when the category from context changes
  useEffect(() => {
    async function fetchProductsByCategory() {
      if (category == "all") {
        try {
          const response = await axios.get(`/product/getproduct`);
          if (response.data.products.length === 0) {
            // If no products match the category, show a message or reset the filtered products
            setFilteredProducts([]);
            setError("No products found for this category.");
          } else {
            setFilteredProducts(response.data.products);
            setError(null); // Clear any previous errors
          }
          return;
        } catch (e) {
          console.log(e.message);
          setError("Failed to load products for the selected category.");
          setFilteredProducts([]); // Reset to empty if there's an error
          return;
        }
      }
      if (category) {
        try {
          // Fetch products for the selected category
          const response = await axios.get(
            `/product/getproduct?category=${category}`
          );
          if (response.data.products.length === 0) {
            // If no products match the category, show a message or reset the filtered products
            setFilteredProducts([]);
            setError("No products found for this category.");
          } else {
            setFilteredProducts(response.data.products);
            setError(null); // Clear any previous errors
          }
        } catch (err) {
          console.error("Error fetching category products:", err);
          setError("Failed to load products for the selected category.");
          setFilteredProducts([]); // Reset to empty if there's an error
        }
      } else {
        // Reset to original products if no category is selected
        setFilteredProducts(products);
      }
    }

    fetchProductsByCategory();
  }, [category, products]); // Ensure products are included as a dependency
  useEffect(() => {
    const scrollToProducts = () => {
      const productsSection = document.querySelector(".items");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    // Trigger scroll whenever categry change
    if(category!=="" && page=="home"){
      scrollToProducts();
    }
  }, [category]); 

  useEffect(() => {
    async function fetchSearchTerm() {
      if (searchTerm) {
        try {
          setCategory("");
          const response = await axios.get(
            `/product/getproduct?name=${searchTerm}`
          );
          if (response.data.products.length === 0) {
            setFilteredProducts([]);
            setError("No products found for this category.");
          } else {
            setFilteredProducts(response.data.products);
            setError(null);
          }
        } catch (err) {
          console.error("Error fetching search products:", err);
          setError("Failed to load products for the selected category.");
          setFilteredProducts([]);
        }
      } else {
        setFilteredProducts(products);
      }
    }
    fetchSearchTerm();
    
  }, [searchTerm]);

  // Apply filters based on the user's input from the sidebar
  const applyFilters = async (filters) => {
    try {
      const {
        name,
        brand,
        category,
        priceMin,
        priceMax,
        rating,
        sortBy,
        sort,
      } = filters;
      let query = "/product/getproduct?";

      if (name) query += `name=${name}&`;
      if (brand) query += `brand=${brand}&`;
      if (category) query += `category=${category}&`;
      if (priceMin) query += `priceMin=${priceMin}&`;
      if (priceMax) query += `priceMax=${priceMax}&`;
      if (rating) query += `rating=${rating}&`;
      if (sortBy) query += `sortBy=${sortBy}&sort=${sort}`;

      const response = await axios.get(query);
      setFilteredProducts(response.data.products);
    } catch (err) {
      console.error("Error filtering products:", err);
      setError("Failed to filter products.");
    }
  };

  return (
    <div
      className={`w-full flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } overflow-x-hidden`}
    >
      {page === "shop" ? <Sidebar onApplyFilters={applyFilters} /> : ""}

      <div className="w-full flex justify-center items-start">
        <div className="w-full flex justify-center flex-wrap">
          {page === "home" ? <BannerCarousel /> : ""}
          {error ? (
            <section
              className="items bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-md mt-8 shadow-md flex items-start space-x-4"
              role="alert"
              aria-live="assertive"
            >
              {/* Icon */}
              <svg
                className="h-6 w-6 flex-shrink-0 text-red-500 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zm-5.657 8.486v2m0-8v2m0 4h.01"
                />
              </svg>

              {/* Error Message */}
              <div className="flex-1">
                <p className="text-sm font-semibold">{error}</p>
                <p className="text-sm mt-1">
                  Please resolve the issue and try again.
                </p>
              </div>

              {/* Dismiss Button */}
              <button
                type="button"
                className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-md"
                onClick={() => setCategory("all")} // Example function to clear error
                aria-label="Dismiss error message"
              >
                ✕
              </button>
            </section>
          ) : filteredProducts.length > 0 ? (
            <section
              id="products"
              className="items w-full h-full p-4 flex flex-wrap gap-4 justify-center"
            >
              {page === "home" ? (
                <div className="w-full flex justify-center items-center">
                  <h2
                    className={`text-3xl py-10 font-bold ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Our Latest Product
                  </h2>
                </div>
              ) : (
                ""
              )}
              <DisplayProducts products={filteredProducts} />
            </section>
          ) : (
            <>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full animate-spin flex items-center justify-center">
                  <MdOutlineRotateRight
                    size={45}
                    style={{ color: "blue", paddingTop: "1px" }}
                  />
                </div>
                <p className="text-orange-600">Loading products...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
