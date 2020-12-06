import Mongoose from "mongoose";

const uri = process.env.DB_URI || "";

const connect = async () => {
  console.log("🔄 Connecting to database ...");
  try {
    await Mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      // callback,
    );
    console.log("📚 Connected to database");
  } catch (error) {
    console.log("⚠️ Error connecting to database");
    setTimeout(connect, 3000);
  }
};

export { connect };
