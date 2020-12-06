import Mongoose, { CallbackError } from "mongoose";

const uri = process.env.DB_URI || "";

const callback = (err: CallbackError) => {
  if (!err) {
    console.log("📚 Connected to database");
    return;
  }
  console.log("⚠️ Error connecting to database");
  setTimeout(() => {
    console.log("🔄 Reconnecting to database ...");
    connect();
  }, 3000);
};

const connect = () => {
  Mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    callback,
  );
};

connect();
