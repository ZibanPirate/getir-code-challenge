import express from "express";
import { healthController } from "./controllers/health";
import { recordsController } from "./controllers/records";

const app = express();

// Global middleware setup

// Controllers
app.use("/", healthController);
app.use("/records", recordsController);

// Bootstrap the app
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.info(`🚀 app listening on port ${port}!`);
});
