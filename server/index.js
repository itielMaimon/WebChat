const express = require("express");
const socketio = require("socket.io");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");

const Room = require("./models/room");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");
const { joinRoom } = require("./rooms.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

// Connect to the database
connectDB();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", async ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      username: "admin",
      text: `${user.name} welcome to room ${user.room}`,
      timestamp: Date.now(),
    });

    socket.broadcast.to(user.room).emit("message", {
      username: "admin",
      text: `${user.name} has joined the chat`,
      timestamp: Date.now(),
    });

    socket.join(user.room);

    const roomsList = await joinRoom(user);
    const roomData = await Room.findOne({ roomname: user.room });

    io.to(user.room).emit("roomUsersData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    io.to(user.room).emit("roomMessagesData", {
      room: user.room,
      messages: roomData.messages,
    });

    io.to(user.room).emit("userData", {
      rooms: roomsList,
    });

    callback();
  });

  socket.on("sendMessage", async (message, callback) => {
    const user = getUser(socket.id);

    const room = await Room.findOne({ roomname: user.room });

    const messageInRoom = {
      username: user.name,
      text: message,
      timestamp: Date.now(),
    };

    io.to(user.room).emit("message", messageInRoom);

    room.messages.push(messageInRoom);

    await room.collection.updateOne(
      { _id: room._id },
      { $set: { messages: room.messages } }
    );

    // const newmessage = new Message({
    //   username: user.name,
    //   message: message,
    //   timestamp: Date.now(),
    // });

    // await newmessage.save();

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        username: "admin",
        text: `${user.name} has left the chat`,
        timestamp: Date.now(),
      });

      io.to(user.room).emit("roomData", {
        room: user.name,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log("Server listening on port %d", PORT));
