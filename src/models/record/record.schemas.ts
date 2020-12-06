import { Schema } from "mongoose";

const RecordSchema = new Schema({
  _id: String,
  key: String,
  counts: [Number],
  value: String,
  createdAt: Date,
});

export { RecordSchema };
