import express from "express";
const aboutRouter = express.Router();
import { getAboutUs, updateAboutUs } from "../controllers/aboutController.js"; // Named imports

aboutRouter.get("/", getAboutUs);
aboutRouter.put("/", updateAboutUs);

export default aboutRouter;
