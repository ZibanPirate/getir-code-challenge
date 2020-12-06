module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  modulePathIgnorePatterns: ["<rootDir>/heroku"],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.(t|j)s"],
  coveragePathIgnorePatterns: ["src/index.ts"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
};
