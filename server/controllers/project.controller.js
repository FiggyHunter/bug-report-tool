import Project from "../models/Project.model.js";
import { getProjectsByUserId } from "../services/project.dao.js";

const getAllProjectsByUser = async (req, res) => {
  try {
    const id = req.headers["x-user-id"];
    const projects = await getProjectsByUserId(id);
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

const getProjectByRequestedId = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const project = await Project.findOne({ _id: id });
    const { _id, projectName, color, description } = project;
    if (project) res.status(200).json({ _id, projectName, color, description });
    else res.status(404).json({ message: "User has no projects." });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Server error: Could not fetch projects" });
  }
};

export { getAllProjectsByUser, createNewProject, getProjectByRequestedId };
