const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const ConnectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;
