import { Document } from "mongoose";

export type RecordWithTotalCount = {
  key: string;
  createdAt: string;
  totalCount: number;
};

export interface Record {
  key: string;
  createdAt: string;
  counts: number[];
}

export interface RecordDocument extends Record, Document {}
