import { RecordsFetchPostDto } from "./dto";
import { RecordsFetchPostResponse } from "./types";
import { Router } from "express";
import { validateMw } from "../../middleware/validation";

const recordsController = Router();

recordsController.post<never, RecordsFetchPostResponse, RecordsFetchPostDto>(
  "/",
  validateMw(RecordsFetchPostDto),
  (req, res) => {
    res.json({
      code: 0,
      msg: "Success",
      records: [
        {
          key: "TAKwGc6Jr4i8Z487",
          createdAt: "2017-01-28T01:22:14.398Z",
          totalCount: 2800,
        },
      ],
    });
  },
);

export { recordsController };
