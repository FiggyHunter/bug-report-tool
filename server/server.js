import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import bugRoutes from "./routes/bug.routes.js";

const app = express();
const env = dotenv.config();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", authRoutes);
app.use("/bugs", bugRoutes);

app.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).send("Hello World!");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/bug-report")
  .then(() => console.log("Connected to DB!"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Bug report tool backend listening on port ${process.env.SERVER_PORT}`
  );
});
