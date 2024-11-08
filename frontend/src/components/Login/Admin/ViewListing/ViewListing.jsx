// ... existing imports
import React, { useState, useEffect } from "react";
import axios from "../../../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Ensure Modal is imported

function ViewListing() {
  const [productData, setProductData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Fetch all products from the backend
  async function fetchAllProducts() {
    try {
      const response = await axios.get("/product/getproduct");
      setProductData(response.data.products);
    } catch (err) {
      console.log(err.message);
    }
  }

  // Delete product by ID
  async function deleteProduct(e) {
    const id = e.target.id;
    try {
      await axios.delete(`/product/deleteproduct/${id}`);
      fetchAllProducts(); // Refresh the product list after deletion
    } catch (err) {
      console.log(err.message);
    }
  }

  // Handle the update button click
  function handleUpdateClick(product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  // Update product
  async function updateProduct(formData, productId) {
    try {
      const response = await axios.put(
        `/product/updateproduct/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      fetchAllProducts(); // Refresh the product list
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="p-3 w-full flex flex-col justify-center items-center overflow-x-scroll">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>

      {/* Product Table */}
      <div className="overflow-scroll h-screen max-w-[18rem] sm:max-w-full md:w-full">
        <table className=" bg-white border border-gray-300 table-auto w-full">
          <thead cla>
            <tr className="bg-gray-200">
              <th className="border p-3 border-gray-300 ">S NO.</th>
              <th className="border p-3 border-gray-300">Name</th>
              <th className="border p-3 border-gray-300">Price</th>
              <th className="border p-3 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {productData.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-gray-100 border-gray-500"
              >
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border text-center">{product.name}</td>
                <td className="p-3 border text-center">{product.price}</td>
                <td className="p-3 border flex justify-center items-center flex-wrap gap-4">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded-md"
                    onClick={() => handleUpdateClick(product)}
                  >
                    Update
                  </button>
                  <button
                    id={product._id}
                    onClick={deleteProduct}
                    className="bg-red-500 text-white p-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <Link to="/admin/add" className="mt-4 inline-block bg-blue-500 text-white p-2 rounded-md">Add Product</Link> */}

      {/* Update Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onUpdate={updateProduct}
      />
    </div>
  );
}

export default ViewListing;
