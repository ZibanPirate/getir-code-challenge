import { RecordsFetchPostResponse } from "../src/controllers/records/types";
import { app } from "../src/app";
import request from "supertest";

describe("Test Health Controller", () => {
  test("It Should return 400 with validation message for startDate", async () => {
    const response = await request(app).post("/records").send({});
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject<RecordsFetchPostResponse>({
      code: 400,
      msg: "startDate must match /^\\d{4}-\\d{2}-\\d{2}$/ regular expression",
    });
  });

  test("It Should return 400 with validation message for endDate", async () => {
    const response = await request(app).post("/records").send({
      startDate: "2016-01-26",
    });
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject<RecordsFetchPostResponse>({
      code: 400,
      msg: "endDate must match /^\\d{4}-\\d{2}-\\d{2}$/ regular expression",
    });
  });

  test("It Should return 400 with validation message for minCount", async () => {
    const response = await request(app).post("/records").send({
      startDate: "2016-01-26",
      endDate: "2018-02-02",
    });
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject<RecordsFetchPostResponse>({
      code: 400,
      msg: "minCount must be a number conforming to the specified constraints",
    });
  });

  test("It Should return 400 with validation message for maxCount", async () => {
    const response = await request(app).post("/records").send({
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
    });
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject<RecordsFetchPostResponse>({
      code: 400,
      msg: "maxCount must be a number conforming to the specified constraints",
    });
  });

  test("It Should return 200 with records", async () => {
    const response = await request(app).post("/records").send({
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
      maxCount: 3000,
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject<RecordsFetchPostResponse>({
      code: 0,
      msg: "Success",
      records: expect.arrayContaining([
        {
          key: expect.any(String),
          createdAt: expect.any(String),
          totalCount: expect.any(Number),
        },
      ]),
    });
  });
});
