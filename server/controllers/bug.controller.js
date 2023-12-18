import { getBugsById } from "../services/bug.dao.js";
import Bug from "../models/BugTicket.model.js";

export const findBugById = async (id) => {
  /*  
#swagger.tags = ['Bugs']
#swagger.description = 'Finds a bug by it's ID.'   
*/
  try {
    const bug = await Bug.findOne({ _id: id });
    return bug || null;
  } catch (error) {
    throw new Error(`Error finding bug by ID: ${error.message}`);
  }
};

export const getAllBugs = async (req, res) => {
  const id = req.headers["project-id"];
  try {
    const bugs = await Bug.find({ projectId: id });

    if (bugs.length === 0) {
      return res
        .status(404)
        .json({ message: "No bugs found for the given project ID" });
    }

    res.status(200).send(bugs.reverse());
  } catch (error) {
    console.error("Error fetching bugs:", error);
    res
      .status(500)
      .json({ error: "Server Exception: Could not retrieve bugs" });
  }
};

export const getAllRecentBugs = async (req, res) => {
  /*  #swagger.tags = ['Bugs']
#swagger.description = 'Endpoint to get the recent 5 bugs from the user.' 
  */

  const id = req.headers["x-user-id"];
  try {
    const bugs = await Bug.find({ createdBy: id });
    res.status(200).send(bugs.reverse().slice(0, 5));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server Exception: Could not retrieve bugs" });
  }
};

export const createNewBug = async (req, res) => {
  /*  
#swagger.tags = ['Bugs']
#swagger.description = 'Endpoint to get create a new bug.' 
*/
  const data = req.body;
  const userId = req.headers["x-user-id"];
  try {
    await Bug.create({ ...data, createdBy: userId });
    res.status(201).json({ message: "Bug created successfully!" });
  } catch (error) {
    res.status(500).json({
      error: `Server Exception: Bug was not created - ${error.message}`,
    });
  }
};

export const deleteBug = async (req, res) => {
  /*  
#swagger.tags = ['Bugs']
#swagger.description = 'Endpoint to get delete a bug.' 
*/
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
  /*  
#swagger.tags = ['Bugs']
#swagger.description = 'Endpoint to get all bugs by userId.' 
*/
  const { role, id } = req.user;
  try {
    const bugs = await getBugsById(id, role);
    if (bugs) res.status(400).json({ bugs });
    else res.status(400).json({ message: "Could not find bugs" });
  } catch (e) {
    res.status(400).json({ message: "Server error: Could not fetch bugs" });
  }
};

export const changeCompletedStatus = async (req, res) => {
  /*  
#swagger.tags = ['Bugs']
#swagger.description = 'Endpoint to change the completed status of a bug.' 
*/
  const { bugId } = req.params;
  try {
    const bug = await Bug.findById(bugId);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }
    bug.completed = !bug.completed;
    await bug.save();
    res.status(200).json({ message: "Updated bug successfully", bug });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update bug" });
  }
};
