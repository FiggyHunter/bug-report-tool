import express from "express";
import {
  createNewBug,
  deleteBug,
  getAllBugs,
} from "../controllers/bug.controller.js";

const router = express.Router();

router
  .get("/", getAllBugs)
  .post("/create", createNewBug)
  .delete("/delete/:id", deleteBug);

export default router;
