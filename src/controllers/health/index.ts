import { Router } from "express";

const healthController = Router();

healthController.get("/", (req, res) => {
  const currentTime = new Date();
  res.send(currentTime.toISOString());
});

export { healthController };
