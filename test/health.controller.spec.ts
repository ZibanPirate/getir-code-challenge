import { HealthGetResponse } from "../src/controllers/health/types";
import { app } from "../src/app";
import request from "supertest";

describe("Test Health Controller", () => {
  test("It Should return 200 with current date in ISO format", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject<HealthGetResponse>({
      code: 0,
      msg: "Success",
      time: expect.any(String),
    });
  });
});
