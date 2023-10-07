import mongoose from "mongoose";
const { Schema } = mongoose;

const bugTicketSchema = new Schema({
  title: String,
  steps: String,
  assignedTo: String,
  reportedBy: String,
  completed: Boolean,
  timestamp: {
    type: Date,
    default: new Date(),
  },
  severity: String,
});

const Bug = mongoose.model("bugsTickets", bugTicketSchema);

export default Bug;
