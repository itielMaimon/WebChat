const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("./models/message");

router.get("/", (req, res) => {
  res.send("Server is up and running");
});

router.get("/messages", async (req, res) => {
  const chatList = await Message.find().sort({ timestamp: -1 }).limit(5);
  res.json({ messages: chatList });
});

module.exports = router;
