import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import bugRoutes from "./routes/bug.routes.js";
import projectRoutes from "./routes/project.routes.js";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" assert { type: "json" };

const app = express();
const env = dotenv.config();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/auth", authRoutes);
app.use("/bugs", bugRoutes);
app.use("/project", projectRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB!"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Bug report tool backend listening on port ${process.env.SERVER_PORT}`
  );
});
