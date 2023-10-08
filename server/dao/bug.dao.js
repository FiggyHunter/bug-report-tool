import Bug from "../models/BugTicket.model.js";
import User from "../models/User.model.js";
import { ROLES } from "../constants.js";

export const getBugsById = async (role) => {
  let bugs = [];
  if (role === ROLES.QA) {
    bugs = await Bug.find({ reportedBy: userId });
  } else bugs = await Bug.find({ assignedTo: userId });
  return bugs || null;
};
