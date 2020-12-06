import { MongoMemoryServer } from "mongodb-memory-server";
import Mongoose from "mongoose";
import { RecordMongooseModel } from "../src/models/record";
import { RecordsFetchPostResponse } from "../src/controllers/records/records.types";
import { app } from "../src/app";
import fullData from "./data.json";
import request from "supertest";

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer: MongoMemoryServer;
jest.spyOn(global.console, "log").mockImplementation(() => jest.fn());

describe("Test Health Controller", () => {
  beforeEach(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await Mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 1000,
    });
  });

  afterEach(async () => {
    await Mongoose.disconnect();
    await mongoServer.stop();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

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

  test("It Should return 500 with internal server error message", async () => {
    // Add some records
    await RecordMongooseModel.insertMany(fullData);
    // Stop the mongodb server
    await mongoServer.stop();

    const response = await request(app).post("/records").send({
      startDate: "2015-06-03",
      endDate: "2016-04-26",
      minCount: 2700,
      maxCount: 3000,
    });
    expect(response.status).toBe(500);
    expect(response.body).toMatchObject<RecordsFetchPostResponse>({
      code: 500,
      msg: expect.stringContaining("connect ECONNREFUSED"),
    });
  });

  test("It Should return 200 with records", async () => {
    // Add some records
    await RecordMongooseModel.insertMany(fullData);

    const response = await request(app).post("/records").send({
      startDate: "2015-06-03",
      endDate: "2016-04-26",
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
