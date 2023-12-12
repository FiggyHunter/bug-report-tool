import express from "express";
import {
  getAllProjectsByUser,
  createNewProject,
  getProjectByRequestedId,
  getAllRecentProjectsByUser,
} from "../controllers/project.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .get("/", getAllProjectsByUser)
  .get("/recent", getAllRecentProjectsByUser)
  .get("/:id", getProjectByRequestedId)
  .post("/create", createNewProject);

export default router;
