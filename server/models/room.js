const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  roomname: { type: String, required: true },
  users: { type: Array, required: true },
  messages: { type: Array, required: false },
  createdAt: { type: Date },
});

module.exports = Room = mongoose.model("rooms", RoomSchema);
