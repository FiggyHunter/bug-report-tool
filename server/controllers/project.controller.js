import Project from "../models/Project.model.js";
import { getProjectsById } from "../services/project.dao.js";

const getAllProjectsByUser = async (req, res) => {
  try {
    const { id } = req.body;
    const projects = await getProjectsById(id);
    if (projects) res.status(200).json({ projects });
    else res.status(404).json({ message: "User has no projects." });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Server error: Could not fetch bugs" });
  }
};

const createNewProject = async (req, res) => {
  const data = req.body;
  try {
    await Project.create({ ...data });
    res.status(201).json({ message: "Project created successfully!" });
  } catch (error) {
    res.status(500).json({
      error: `Server Exception: Project was not created - ${error.message}`,
    });
  }
};

export { getAllProjectsByUser, createNewProject };
