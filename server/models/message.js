const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = Message = mongoose.model("messages", MessageSchema);
