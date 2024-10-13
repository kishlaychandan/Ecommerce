// import React, { useEffect, useState } from "react";
// import axios from "../axiosConfig";
// import DisplayProducts from "./DisplayProducts";
// import BannerCarousel from "./BannerCarousel";
// import Sidebar from "./Sidebar";

// function Products() {
//   const [products, setProducts] = useState([]);  // Original products
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [error, setError] = useState(null);

//   // Fetch all products when the component mounts
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get("/product/getproduct");
//         console.log(response.data);
//         setProducts(response.data.products);
//         setFilteredProducts(response.data.products);  // Initialize filteredProducts
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products.");
//       }
//     }
//     fetchData();
//   }, []);

//   // Apply filters based on the user's input from the sidebar
//   const applyFilters = async (filters) => {
//     try {
//       const { name, brand, category, priceMin, priceMax, rating, sortBy, sort } = filters;
//       let query = "/product/getproduct?";
  
//       if (name) query += `name=${name}&`;
//       if (brand) query += `brand=${brand}&`;
//       if (category) query += `category=${category}&`;
//       if (priceMin) query += `priceMin=${priceMin}&`;
//       if (priceMax) query += `priceMax=${priceMax}&`;
//       if (rating) query += `rating=${rating}&`;
//       if (rating) query += `rating=${rating}&`;
//       if (sortBy) query += `sortBy=${sortBy}&sort=${sort}`;
  
//       const response = await axios.get(query);
//       setFilteredProducts(response.data.products);
//     } catch (err) {
//       console.error("Error filtering products:", err);
//       setError("Failed to filter products.");
//     }
//   };
  

//   return (
//     <>
//       <div className="w-full flex">
//         {/* Pass applyFilters to Sidebar */}
//         <Sidebar onApplyFilters={applyFilters} />
        
//         <div className="w-full flex ">
//           <div className="w-full flex justify-center flex-wrap">
//       <BannerCarousel />
//             {error ? (
//               <p className="text-red-500"> {error} </p>
//             ) : filteredProducts.length > 0 ? (
//               <section
//                 id="products"
//                 className="w-full py-4 px-12 flex flex-wrap gap-4 justify-center"
//               >
//                 <DisplayProducts products={filteredProducts} />
//               </section>
//             ) : (
//               <p>Loading products...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Products;


import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig";
import DisplayProducts from "./DisplayProducts";
import BannerCarousel from "./BannerCarousel";
import Sidebar from "./Sidebar";
import { ThemeContext } from "../ThemeContext";  // Import ThemeContext

function Products({page}) {
  const { isDarkMode } = useContext(ThemeContext);  // Get isDarkMode from context
  const [products, setProducts] = useState([]);  // Original products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [error, setError] = useState(null);
  
  console.log("isDarkMode", isDarkMode);
  
  // Fetch all products when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/product/getproduct");
        console.log(response.data);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);  // Initialize filteredProducts
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      }
    }
    fetchData();
  }, []);

  // Apply filters based on the user's input from the sidebar
  const applyFilters = async (filters) => {
    try {
      const { name, brand, category, priceMin, priceMax, rating, sortBy, sort } = filters;
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
    <div className={`w-full flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} overflow-x-hidden`}>
      {page === "shop"?(
        <Sidebar onApplyFilters={applyFilters} />
      ):
        ""
      }
      
      <div className="w-full flex justify-center items-center">
        <div className="w-full flex justify-center flex-wrap">
          {page === "home" ? (
            <BannerCarousel />
          ) : (
            ""
          )}
          {error ? (
            <p className="text-red-500"> {error} </p>
          ) : filteredProducts.length > 0 ? (
            <section
              id="products"
              className="w-full py-4 px-12 flex flex-wrap gap-4 justify-center"
            >
              <DisplayProducts products={filteredProducts} />
            </section>
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
