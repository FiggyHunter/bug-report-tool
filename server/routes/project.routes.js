import express from "express";
import {
  getAllProjectsByUser,
  createNewProject,
} from "../controllers/project.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProjectsByUser).post("/create", createNewProject);

export default router;
