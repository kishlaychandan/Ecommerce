import React, { useEffect, useState } from 'react';

function Modal({ isOpen, onClose, product, onUpdate }) {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    inStock: false,  // Set default to false as boolean
    inventory: "",
    url: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (product) {
      setData({
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        description: product.description,
        inStock: product.inStock,  // Ensure inStock is handled as boolean
        inventory: product.inventory,
        url: product.url,
      });
      setPreviewImage(product.url);
    }
  }, [product]);

  function handleChange(e) {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setData({ ...data, url: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      const value = e.target.name === 'inStock' ? e.target.value === 'true' : e.target.value;
      setData({ ...data, [e.target.name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      // Pass the product ID for updating
      await onUpdate(formData, product._id);
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Update Product</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <input
              type="text"
              name="brand"
              value={data.brand}
              onChange={handleChange}
              placeholder="Enter brand"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <input
              type="text"
              name="category"
              value={data.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 h-24"
              required
            />

            {/* Dropdown for In Stock Boolean */}
            <label className="block mb-2">In Stock</label>
            <select
              name="inStock"
              value={data.inStock ? "true" : "false"}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            >
              <option value="true">Available</option>
              <option value="false">NotAvailable</option>
            </select>

            <input
              type="number"
              name="inventory"
              value={data.inventory}
              onChange={handleChange}
              placeholder="Enter inventory"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />

            {previewImage && (
              <div className="mb-4">
                <img src={previewImage} alt="Product Preview" className="w-full h-48 object-cover rounded-md" />
              </div>
            )}

            <input
              type="file"
              name="url"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Update Product
            </button>
          </form>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}

export default Modal;
