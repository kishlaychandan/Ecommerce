import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill

const EditAbout = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get("/about");
        setContent(response.data);
      } catch (err) {
        console.error("Error fetching about content:", err);
        setError("Could not fetch About Us content");
      }
    };

    fetchAboutContent();
  }, []);

  const handleChange = (value) => {
    setContent(value); // Update content with React Quill's value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/about", { content });
      alert("About Us content updated successfully");
      navigate("/admin"); // Redirect to admin page or wherever you want
    } catch (err) {
      console.error("Error updating about content:", err);
      setError("Could not update About Us content");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit About Us</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <ReactQuill
          value={content}
          onChange={handleChange} // Use React Quill's onChange
          className="border rounded w-full"
          placeholder="Edit About Us content here..."
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditAbout;
