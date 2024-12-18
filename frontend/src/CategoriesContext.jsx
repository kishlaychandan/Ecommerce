import React, { createContext, useState, useContext, useEffect } from "react";

const CategoriesContext = createContext();

// Provider component to manage the state for categories and searchTerm
export const CategoriesProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  // Method to update the search term
  const handleSearchChange = (term) => {
    console.log(term);
    setSearchTerm(term);
  };

  // Method to update the category
  const handleCategoryChange = (categoryName) => {
    console.log(categoryName);
    setCategory(categoryName);
  };

  useEffect(() => {
    // Optionally, you can sync or log state changes here if needed
    console.log(`Search Term: ${searchTerm}, Category: ${category}`);
  }, [searchTerm, category]);

  return (
    <CategoriesContext.Provider
      value={{
        searchTerm,
        setSearchTerm: handleSearchChange,
        category,
        setCategory: handleCategoryChange,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

// Custom hook to use the CategoriesContext in other components
export const useCategories = () => {
  return useContext(CategoriesContext);
};