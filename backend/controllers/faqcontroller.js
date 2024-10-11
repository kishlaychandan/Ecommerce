// controllers/faqController.js
import Faq from "../models/Faq.js";

// Fetch all FAQs
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error.message);
    res.status(500).json({ message: "Error fetching FAQs" });
  }
};

// Add a new FAQ
export const addFAQ = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const newFAQ = new Faq({ question, answer });
    await newFAQ.save();
    res.status(201).json({ message: "FAQ added successfully", newFAQ });
  } catch (error) {
    console.error("Error adding FAQ:", error.message);
    res.status(500).json({ message: "Error adding FAQ" });
  }
};

// Update an existing FAQ
export const updateFAQ = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const updatedFAQ = await Faq.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ updated successfully", updatedFAQ });
  } catch (error) {
    console.error("Error updating FAQ:", error.message);
    res.status(500).json({ message: "Error updating FAQ" });
  }
};

// Delete an FAQ
export const deleteFAQ = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFAQ = await Faq.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error.message);
    res.status(500).json({ message: "Error deleting FAQ" });
  }
};
