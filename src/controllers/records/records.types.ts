import { GeneralResponse } from "../../types";
import { RecordWithTotalCount } from "../../models/record/record.types";

export interface RecordsFetchPostResponse extends GeneralResponse {
  records?: RecordWithTotalCount[];
}
