import Project from "../models/Project.model.js";

export const getProjectsById = async (userId) => {
  try {
    const projects = await Project.find({ createdBy: userId });
    return projects || null;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
