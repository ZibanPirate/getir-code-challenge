import { GeneralResponse } from "../../../types";

export interface RecordsFetchPostResponse extends GeneralResponse {
  records?: Array<{
    key: string;
    createdAt: string;
    totalCount: number;
  }>;
}
