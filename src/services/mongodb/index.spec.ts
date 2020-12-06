import { connect } from ".";

let successfulConnection = true;

const log = jest
  .spyOn(global.console, "log")
  .mockImplementation(() => jest.fn());
const timeout = jest.spyOn(global, "setTimeout").mockImplementation(jest.fn());

jest.mock("Mongoose", () => ({
  connect: async () => {
    if (!successfulConnection) throw new Error("Error");
  },
}));
describe("Test Mongodb service", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    log.mockClear();
  });
  test("It should call log two times", async () => {
    await connect();
    expect(log).toBeCalledTimes(2);
  });

  test("It should call next if headersSent is true", async () => {
    successfulConnection = false;
    await connect();
    expect(log).toBeCalledTimes(2);
    expect(timeout).toBeCalledTimes(1);
  });
});
