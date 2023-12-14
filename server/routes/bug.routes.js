import express from "express";
import {
  changeCompletedStatus,
  createNewBug,
  deleteBug,
  getAllBugs,
  getAllRecentBugs,
} from "../controllers/bug.controller.js";

const router = express.Router();

router
  .get("/", getAllBugs)
  .get("/recent", getAllRecentBugs)
  .post("/create", createNewBug)
  .patch("/update/:bugId", changeCompletedStatus)
  .delete("/delete/:id", deleteBug);

export default router;
