import { RecordDocument, RecordWithTotalCount } from "./record.types";

import { RecordSchema } from "./record.schemas";
import { model } from "mongoose";

const RecordMongooseModel = model<RecordDocument>("record", RecordSchema);

export class RecordModel {
  static fetchRecords = async (
    startDate: string,
    endDate: string,
    minCount: number,
    maxCount: number,
  ): Promise<RecordWithTotalCount[]> => {
    const records = await RecordMongooseModel.aggregate<RecordWithTotalCount>([
      // filter by provided min and max dates first
      {
        $match: {
          createdAt: { $lte: new Date(endDate), $gte: new Date(startDate) },
        },
      },
      // then sum the counts into a new filed totalCount
      {
        $addFields: {
          totalCount: {
            $reduce: {
              input: "$counts",
              initialValue: 0,
              in: { $add: ["$$value", "$$this"] },
            },
          },
        },
      },
      // then filter by newly created field totalCount
      {
        $match: { totalCount: { $lte: maxCount, $gte: minCount } },
      },
      // finally filter in only the fields we need: key, createdAd and totalCount
      {
        $project: { _id: 0, key: 1, createdAt: 1, totalCount: 1 },
      },
    ]);
    return records;
  };
}
