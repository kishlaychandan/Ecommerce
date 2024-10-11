import About from "../models/About.js"; // Use named imports for clarity

// Fetch About Us content
export const getAboutUs = async (req, res) => {
    console.log("inside get about us");
    
  try {
    const about = await About.findOne();
    if (!about) {
        console.log("about not found");
      return res.status(404).json({ message: "About data not found" });
    }

    // console.log(about.content);
    res.status(200).json(about.content);
  } catch (error) {
    console.error("Error fetching about data:", error.message);
    res.status(500).json({ message: "Error fetching about data" });
  }
};

// Update About Us content
export const updateAboutUs = async (req, res) => {
  const { content } = req.body;

  try {
    const updatedAbout = await About.findOneAndUpdate(
      {},
      { content },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "About Us updated successfully", updatedAbout });
  } catch (error) {
    console.error("Error updating about data:", error);
    res.status(500).json({ message: "Error updating about data" });
  }
};
