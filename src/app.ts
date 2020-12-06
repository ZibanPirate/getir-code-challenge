// For asynchronous error heralding
import "express-async-errors";
// db setup
import "./services/mongodb";

import express, { RequestHandler } from "express";

import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import { healthController } from "./controllers/health";
import helmet from "helmet";
import { json } from "body-parser";
import rateLimit from "express-rate-limit";
import { recordsController } from "./controllers/records";

const app = express();

// Global middleware setup
app.use(helmet());
app.use(json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
app.use(cors());

// Controllers
app.use("/", healthController);
app.use("/records", recordsController);

// Fallback middleware setup
app.use((errorHandler as unknown) as RequestHandler);

export { app };
