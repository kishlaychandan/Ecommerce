import React, { useState,useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from "../CategoriesContext.jsx";
import { ThemeContext } from "../ThemeContext.jsx";
// Directly structured categories array
const categories = [
  { name: 'All', value: 'all' },
  { name: 'Floor Cleaner', value: 'floorcleaner' },
  { name: 'Room Freshener', value: 'roomfreshener' },
  { name: 'Dishwashing', value: 'dishwashing' },
  { name: 'Bathroom Cleaning', value: 'bathroomcleaning' },
  { name: 'Hand Wash', value: 'handwash' },
];

const ShopNav = () => {
  const navigate = useNavigate();
  const { category, setCategory,setSearchTerm } = useCategories();
  const { isDarkMode } = useContext(ThemeContext);
  const [scrolling, setScrolling] = useState(false);
  const handleCategoryClick = (categoryValue) => {
    setCategory(categoryValue);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`hidden lg:block transition-all duration-300 ease-in-out ${isDarkMode ? "text-white" : "text-black"} ${scrolling ? (isDarkMode? "bg-slate-300":"bg-slate-200") : (isDarkMode ? "bg-slate-600" : "bg-slate-300")}`}
    >
      <div className="container mx-auto px-3 py-2 flex justify-center">
        <ul className="flex space-x-6 text-center">
          {categories.map(({ name, value }) => (
            <li
              key={value}
              onClick={() => handleCategoryClick(value)} // Set category using the 'value'
              className={`cursor-pointer px-4 py-2 rounded transition-all duration-200 ${
                category === value
                  ? 'bg-slate-500 text-white' // Highlight selected category
                  : ' hover:bg-slate-500 hover:text-white'
              }`}
            >
              {name} {/* Display the category name */}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ShopNav;
