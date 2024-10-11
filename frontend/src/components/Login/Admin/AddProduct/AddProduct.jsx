import axios from "../../../../axiosConfig";
import { useState } from "react";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    inStock: "",
    inventory: "",
    url: "",
  });

  const [message, setMessage] = useState(""); // State for success/error message

  function handleChange(e) {
    if (e.target.files) {
      setData({ ...data, url: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in data) {
        if (Object.hasOwn(data, key)) {
          formData.append(key, data[key]);
        }
      }
      const response = await axios.post("/product", formData);
      console.log(response);
      
      // Set success message and reset fields
      setMessage("Product added successfully!");
      resetFields();
    } catch (err) {
      console.log(err);
      setMessage("Failed to add product. Please try again."); // Set error message
    }
  }

  // Function to reset input fields
  const resetFields = () => {
    setData({
      name: "",
      brand: "",
      category: "",
      price: "",
      description: "",
      inStock: "",
      inventory: "",
      url: "",
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
        {message && ( // Conditionally render the message
          <div className={`mb-4 p-2 text-center rounded-md ${message.includes("successfully") ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="brand"
              value={data.brand}
              onChange={handleChange}
              placeholder="Enter brand"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="category"
              value={data.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
          </div>
          <div className="mb-4">
          <select
    name="inStock"
    value={data.inStock}
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select stock status</option>
    <option value="1">Yes</option>
    <option value="0">No</option>
  </select>
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="inventory"
              value={data.inventory}
              onChange={handleChange}
              placeholder="Enter inventory"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="url"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
