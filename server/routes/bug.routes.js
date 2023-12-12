import express from "express";
import {
  changeCompletedStatus,
  createNewBug,
  deleteBug,
  getAllBugs,
  getAllBugsByUser,
} from "../controllers/bug.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .get("/", getAllBugs)
  .post("/create", createNewBug)
  .delete("/delete/:id", deleteBug);

export default router;
