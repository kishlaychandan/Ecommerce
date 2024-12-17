import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchAllOrders = async (page = 1, status = "") => {
    try {
      setLoading(true);
      const params = { page, limit: 3 };
      if (status) params.status = status;

      const response = await axios.get("/orders/all", { params });
console.log("response", response);

      console.log("response", response.data);
      setOrders(response.data || []); // Set orders from response, or an empty array
      setTotalPages(response.data.totalPages || 1); // Set total pages
      setCurrentPage(response.data.currentPage || 1); // Set current page
    } catch (error) {
      console.error("Error fetching all orders:", error);
      alert("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders(currentPage, statusFilter);
  }, [currentPage, statusFilter]); // Added dependencies to refetch on page or filter change

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) { // Ensure page is valid
      setCurrentPage(page);
      fetchAllOrders(page, statusFilter);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const confirmUpdate = window.confirm(
        `Are you sure you want to change the status to "${newStatus}"?`
      );
      if (!confirmUpdate) return;

      const response = await axios.patch(`/orders/${orderId}`, { status: newStatus });
      console.log("Order status updated:", response.data);
      
      // Update the local state with the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: response.data.orderStatus } : order
        )
      );
      alert("Order status updated successfully.");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    fetchAllOrders(1, selectedStatus); // Fetch from the first page when filter changes
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Dispatched":
        return "text-blue-500";
      case "Delivered":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      case "Completed":
        return "text-gray-500";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-3">
      <h1 className="text-3xl font-bold mb-6">All Orders (Admin)</h1>

      {/* Filter by status */}
      <div className="mb-6">
        <label htmlFor="statusFilter" className="text-lg mr-2">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg shadow-md transition duration-150 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {orders.length === 0 ? (
        <p className="text-lg">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-3 rounded-lg mb-6 shadow-lg bg-white transition-transform transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold">Order ID: <span className="text-[19px]">{order._id}</span></h2>
            <p>
              User: {order.userId.firstName} {order.userId.lastName} (
              {order.userId.email})
            </p>
            <p className="font-medium">Status: <span className={`font-bold ${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</span></p>
            <p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
            <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>
            <h3 className="mt-3 font-semibold">Products:</h3>
            {order && order.products ? (
  <ul className="list-disc list-inside ml-4">
    {order.products.map((item) => (
      <li key={item.productId?._id}>
        {item.productId ? item.productId.name : 'Product not found'} - Quantity: {item.quantity} - Price: ₹
        {item.price.toFixed(2)}
      </li>
    ))}
  </ul>
) : (
  <p>No order found</p> // Fallback message if no products or order data is found
)}

            <h3 className="mt-3 font-semibold">Shipping Details:</h3>
            {order.shippingDetails ? (
              <>
                <p>Address: {order.shippingDetails.address}</p>
                <p>City: {order.shippingDetails.city}</p>
                <p>Postal Code: {order.shippingDetails.postalCode}</p>
                <p>Country: {order.shippingDetails.country}</p>
              </>
            ) : (
              <p>Shipping details not available.</p>
            )}

            {/* Update Status */}
            <div className="mt-4">
              <label className="mr-2">Update Status:</label>
              <select
                value={order.orderStatus}
                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-md transition duration-150 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Pending">Pending</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 border rounded ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Previous
        </button>
        <span className="px-3 py-1 mx-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 border rounded ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrders;
