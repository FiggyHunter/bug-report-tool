import { getBugsById } from "../dao/bug.dao.js";
import Bug from "../models/BugTicket.model.js";

export const findBugById = async (id) => {
  try {
    const bug = await Bug.findOne({ _id: id });
    return bug || null;
  } catch (error) {
    throw new Error(`Error finding bug by ID: ${error.message}`);
  }
};

export const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({});
    res.status(200).json(bugs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server Exception: Could not retrieve bugs" });
  }
};

export const createNewBug = async (req, res) => {
  const data = req.body;
  try {
    await Bug.create({ ...data });
    res.status(201).json({ message: "Bug created successfully!" });
  } catch (error) {
    res.status(500).json({
      error: `Server Exception: Bug was not created - ${error.message}`,
    });
  }
};

export const deleteBug = async (req, res) => {
  const receivedId = req.params.id;
  try {
    const bug = await findBugById(receivedId);
    if (!bug) {
      return res.status(404).json({ error: "Bug does not exist" });
    }
    await Bug.findByIdAndDelete(receivedId);
    res.status(204).json({ message: "Deleted the Bug successfully" });
  } catch (error) {
    res.status(500).json({
      error: `Server Exception: Bug was not deleted - ${error.message}`,
    });
  }
};

export const getAllBugsByUser = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.user;
  try {
    const bugs = await getBugsById(userId, role);
    if (bugs) res.status(400).json({ bugs });
    else res.status(400).json({ message: "Could not find bugs" });
  } catch {
    res.status(400).json({ message: "Server error: Could not fetch bugs" });
  }
};

export const changeCompletedStatus = async (req, res) => {
  const { bugId } = req.params;
  const { completed } = req.body;
  try {
    const bug = await Bug.findByIdAndUpdate(bugId, { completed });
    res.status(400).json("Updated bug successfully");
  } catch (e) {
    res.json("Could not update bug");
  }
};
