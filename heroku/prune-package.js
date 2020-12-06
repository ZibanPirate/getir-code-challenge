// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require("path");
const fileName = join(__dirname, "dist/package.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const file = require(fileName);

delete file.devDependencies.husky;

fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
  if (err) return console.log(err);
});
