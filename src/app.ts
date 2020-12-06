// For asynchronous error heralding
import "express-async-errors";
// db setup
import "./services/mongodb";

import express, { RequestHandler } from "express";

import { errorHandler } from "./middleware/error-handler";
import { healthController } from "./controllers/health";
import { json } from "body-parser";
import { recordsController } from "./controllers/records";

const app = express();

// Global middleware setup
app.use(json());

// Controllers
app.use("/", healthController);
app.use("/records", recordsController);

// Fallback middleware setup
app.use((errorHandler as unknown) as RequestHandler);

export { app };
