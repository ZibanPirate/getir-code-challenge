import { ErrorRequestHandler } from "express";
import { GeneralResponse } from "../../types";

export const errorHandler: ErrorRequestHandler<
  never,
  GeneralResponse,
  unknown
> = (err, req, res, next) => {
  // Logs error
  console.log("🚩 Internal Server Error");
  console.log(err);

  // Skip if headers are already sent
  if (res.headersSent) {
    return next(err);
  }

  // return a general error response
  res.status(500).json({
    code: 500,
    msg: err.message,
  });
};
