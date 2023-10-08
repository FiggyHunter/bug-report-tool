import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

const CreateBugModal = ({ setIsCreateBugModalOpen, open }) => {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");

  return (
    <>
      <Dialog open={open} onClose={() => setIsCreateBugModalOpen(false)}>
        <DialogTitle>Create Bug</DialogTitle>
        <DialogContent>
          <TextField
            label="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
          <TextField
            label="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateBugModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBugModal;
