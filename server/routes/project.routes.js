import express from "express";
import {
  getAllProjectsByUser,
  createNewProject,
  getProjectByRequestedId,
  getAllRecentProjectsByUser,
  getProjectName,
} from "../controllers/project.controller.js";

const router = express.Router();

router
  .get("/", getAllProjectsByUser)
  .get("/recent", getAllRecentProjectsByUser)
  .get("/one/:id", getProjectByRequestedId)
  .get("/info", getProjectName)
  .post("/create", createNewProject);

export default router;
