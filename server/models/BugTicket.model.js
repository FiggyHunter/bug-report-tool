import mongoose from "mongoose";
const { Schema } = mongoose;

const bugTicketSchema = new Schema({
  title: String,
  description: String,
  projectId: String,
  completed: Boolean,
  timestamp: {
    type: Date,
    default: new Date(),
  },
  createdBy: String,
});

const Bug = mongoose.model("bugs", bugTicketSchema);

export default Bug;
