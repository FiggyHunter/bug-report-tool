import Project from "../models/Project.model.js";
import { getProjectsByUserId } from "../services/project.dao.js";

const getAllProjectsByUser = async (req, res) => {
  /*  
#swagger.tags = ['Projects']
#swagger.description = 'Gets all projects from the user that has the ID passed.' 
*/
  try {
    const id = req.headers["x-user-id"];

    const projects = (await getProjectsByUserId(id)).reverse();
    if (projects) res.status(200).json({ projects });
    else res.status(404).json({ message: "User has no projects." });
  } catch (e) {
    res.status(400).json({ message: "Server error: Could not fetch bugs" });
  }
};

const getAllRecentProjectsByUser = async (req, res) => {
  /*  
#swagger.tags = ['Projects']
#swagger.description = 'Endpoint to get the recent 5 projects from the user.' 
*/
  try {
    const id = req.headers["x-user-id"];
    const projects = (await getProjectsByUserId(id)).slice(-2);
    if (projects) res.status(200).json({ projects });
    else res.status(404).json({ message: "User has no projects." });
  } catch (e) {
    res.status(400).json({ message: "Server error: Could not fetch bugs" });
  }
};

const createNewProject = async (req, res) => {
  /*  
#swagger.tags = ['Projects']
#swagger.description = 'Endpoint to create a new project.' 
*/
  const data = req.body;
  try {
    const newProject = await Project.create({
      ...data,
      createdBy: req.headers["x-user-id"],
    });
    const projectId = newProject._id; // Assuming the ID is stored in the _id field
    res
      .status(201)
      .json({ projectId: projectId, message: "Project created successfully!" });
  } catch (error) {
    res.status(500).json({
      error: `Server Exception: Project was not created - ${error.message}`,
    });
  }
};

const getProjectByRequestedId = async (req, res) => {
  /*  
#swagger.tags = ['Projects']
#swagger.description = 'Gets a project by requested ID.' 
*/
  const id = req.params.id;
  try {
    const project = await Project.findOne({ _id: id });
    const { _id, projectName, color, description } = project;
    if (project) res.status(200).json({ _id, projectName, color, description });
    else res.status(404).json({ message: "User has no projects." });
  } catch (e) {
    res.status(400).json({ message: "Server error: Could not fetch projects" });
  }
};

const getProjectName = async (req, res) => {
  /*  
#swagger.tags = ['Projects']
#swagger.description = 'Gets a project name by requested ID.' 
*/
  const projectId = req.headers["project-id"];
  try {
    const project = await Project.findOne({ _id: projectId });
    const { projectName } = project;
    if (project) res.status(200).json(projectName);
    else res.status(404).json({ message: "User has no projects." });
  } catch (e) {
    res.status(400).json({ message: "Server error: Could not fetch projects" });
  }
};

export {
  getAllProjectsByUser,
  getAllRecentProjectsByUser,
  createNewProject,
  getProjectByRequestedId,
  getProjectName,
};
