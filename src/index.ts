import { app } from "./app";
import { connect } from "./services/mongodb";

// initiate db connection
connect();
// Spin up the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.info(`🚀 app listening on port ${port}!`);
});
