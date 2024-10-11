// routes/faqRoutes.js
import express from "express";
import {
  getAllFAQs,
  addFAQ,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faqcontroller.js";

const faqRouter = express.Router();

faqRouter.get("/", getAllFAQs);
faqRouter.post("/", addFAQ);
faqRouter.put("/:id", updateFAQ);
faqRouter.delete("/:id", deleteFAQ);

export default faqRouter;
