import { Router } from "express";

const recordsController = Router();

recordsController.post("/", (req, res) => {
  res.send("Hello World!");
});

export { recordsController };
