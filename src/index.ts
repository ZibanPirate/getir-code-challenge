import express from "express";
import { healthController } from "./controllers/health";
import { json } from "body-parser";
import { recordsController } from "./controllers/records";
import { validationError } from "./middleware/validation";

const app = express();

// Global middleware setup
app.use(json());

// Controllers
app.use("/", healthController);
app.use("/records", recordsController);

// Global fallback middleware
app.use(validationError);

// Bootstrap the app
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.info(`🚀 app listening on port ${port}!`);
});
