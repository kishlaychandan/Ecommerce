// src/components/EditFaq.jsx
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the path to your axios instance
import { useNavigate } from "react-router-dom";

const EditFaq = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState(null); // Track the ID of the FAQ being edited
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get("/faqs");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError("Could not fetch FAQs");
      }
    };

    fetchFAQs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/faqs/${id}`);
      setFaqs(faqs.filter((faq) => faq._id !== id));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setError("Could not delete FAQ");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/faqs", {
        question: newQuestion,
        answer: newAnswer,
      });
      setFaqs([...faqs, response.data.newFAQ]);
      setNewQuestion("");
      setNewAnswer("");
      alert("FAQ added successfully");
    } catch (error) {
      console.error("Error adding FAQ:", error);
      setError("Could not add FAQ");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`/faqs/${id}`, {
        question: newQuestion,
        answer: newAnswer,
      });
      setFaqs(faqs.map((faq) => (faq._id === id ? response.data.updatedFAQ : faq)));
      setNewQuestion("");
      setNewAnswer("");
      setEditingId(null); // Clear the editing state
      alert("FAQ updated successfully");
    } catch (error) {
      console.error("Error updating FAQ:", error);
      setError("Could not update FAQ");
    }
  };

  const handleEditClick = (faq) => {
    setEditingId(faq._id);
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit FAQs</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(editingId); } : handleAdd} className="mb-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="New Question"
          className="border rounded w-full p-2"
          required
        />
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="New Answer"
          className="border rounded w-full p-2 mt-2"
          rows={4}
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
        >
          {editingId ? "Update FAQ" : "Add FAQ"}
        </button>
      </form>
      <ul className="space-y-4">
        {faqs.map((faq) => (
          <li key={faq._id} className="border p-4 rounded">
            <h2 className="font-semibold">{faq.question}</h2>
            <p>{faq.answer}</p>
            <button
              onClick={() => handleEditClick(faq)} // Set the editing state
              className="text-green-500 mt-2 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(faq._id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditFaq;
