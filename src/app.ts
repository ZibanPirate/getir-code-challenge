import express from "express";
import { healthController } from "./controllers/health";
import { json } from "body-parser";
import { recordsController } from "./controllers/records";

const app = express();

// Global middleware setup
app.use(json());

// Controllers
app.use("/", healthController);
app.use("/records", recordsController);

export { app };
