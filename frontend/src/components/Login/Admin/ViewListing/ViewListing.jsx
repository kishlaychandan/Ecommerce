// ... existing imports
import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Ensure Modal is imported

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
      const response = await axios.put(`/product/updateproduct/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      fetchAllProducts(); // Refresh the product list
    } catch (err) {
      console.log(err.message);
    }
  }
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>

      {/* Product Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border-b">S NO.</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Price</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, index) => (
            <tr key={product._id}>
              <td className="p-3 border-b">{index + 1}</td>
              <td className="p-3 border-b cursor-pointer" onClick={() => navigate(`/admin/product/${product._id}`)}>{product.name}</td>
              <td className="p-3 border-b">{product.price}</td>
              <td className="p-3 border-b">
                <button className="bg-yellow-500 text-white p-1 rounded-md mr-2" onClick={() => handleUpdateClick(product)}>Update</button>
                <button id={product._id} onClick={deleteProduct} className="bg-red-500 text-white p-1 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
