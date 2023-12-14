import mongoose from "mongoose";
const { Schema } = mongoose;
// Define the project schema
const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  users: [
    {
      type: String, // Assuming user IDs are strings
      ref: "User",
    },
  ],
  createdBy: {
    type: String,
    ref: "User",
    required: true,
  },
});

// Create the Mongoose model
const Project = mongoose.model("Project", projectSchema);

// Export the model for use in other files
export default Project;
