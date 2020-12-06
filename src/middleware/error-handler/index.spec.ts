import { errorHandler } from ".";

jest.spyOn(global.console, "log").mockImplementation(() => jest.fn());

describe("Test Error Handler Middleware", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test("It should call next if headersSent is true", async () => {
    const nx = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorHandler(null, {} as any, { headersSent: true } as any, nx);
    expect(nx).toBeCalled();
  });
});
