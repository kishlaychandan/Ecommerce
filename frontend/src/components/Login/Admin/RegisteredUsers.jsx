import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users per page
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/user"); // API endpoint to fetch users
      setUsers(response.data.users);
      console.log(response.data.users);

      setTotalUsers(response.data.total); // Assuming the total users count is returned
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/user/${userId}`); // API endpoint to delete user
      setUsers(users.filter((user) => user._id !== userId)); // Update state
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(totalUsers / usersPerPage); // Calculate total pages

  return (
    <div className="p-3 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        //make table responsive
        <div className="overflow-x-scroll max-w-[18rem] sm:max-w-full md:max-w-full">
          <table className="table-auto border w-full">
            <thead>
              <tr className="bg-gray-300 text-center">
                <th className="border p-3">#</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Role</th>
                <th className="border p-3">Created At</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user._id} className="border-b text-center">
                    <td className="border p-2">
                      {indexOfFirstUser + index + 1}
                    </td>
                    <td className="border p-2">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.role}</td>
                    <td className="border p-2">{user.createdAt}</td>
                    <td className="border p-2 flex justify-center">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border p-2 text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center flex-wrap mt-4 w-full">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisteredUsers;
