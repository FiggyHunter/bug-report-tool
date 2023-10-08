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
  .get("/", authMiddleware, getAllBugs)
  .post("/create", authMiddleware, createNewBug)
  .delete("/delete/:id", authMiddleware, deleteBug)
  .get("/:userId", authMiddleware, getAllBugsByUser)
  .patch("/:bugId", authMiddleware, changeCompletedStatus);

export default router;
