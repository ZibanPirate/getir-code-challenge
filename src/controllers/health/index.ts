import { HealthGetResponse } from "./types";
import { Router } from "express";

const healthController = Router();

healthController.get<never, HealthGetResponse, unknown>("/", (req, res) => {
  const currentTime = new Date();
  res.send({
    code: 0,
    msg: "Success",
    time: currentTime.toISOString(),
  });
});

export { healthController };
