import { IsNumber, Matches } from "class-validator";

export class RecordsFetchPostDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate!: "2016-01-26";

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  endDate!: "2018-02-02";

  @IsNumber()
  minCount!: 2700;

  @IsNumber()
  maxCount!: 3000;
}
