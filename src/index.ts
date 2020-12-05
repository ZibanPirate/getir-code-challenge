import { app } from "./app";

// Bootstrap the app
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.info(`🚀 app listening on port ${port}!`);
});
