import { RecordModel } from "../../models/record";
import { RecordsFetchPostDto } from "./dto";
import { RecordsFetchPostResponse } from "./records.types";
import { Router } from "express";
import { validateMw } from "../../middleware/validation";

const recordsController = Router();

recordsController.post<never, RecordsFetchPostResponse, RecordsFetchPostDto>(
  "/",
  validateMw(RecordsFetchPostDto),
  async (req, res) => {
    // Get records
    const { startDate, endDate, minCount, maxCount } = req.body;
    const records = await RecordModel.fetchRecords(
      startDate,
      endDate,
      minCount,
      maxCount,
    );
    res.status(200).json({
      code: 0,
      msg: "Success",
      records,
    });
  },
);

export { recordsController };
