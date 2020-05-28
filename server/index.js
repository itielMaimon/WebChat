const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcome to room ${user.room}`,
      timestamp: Date.now(),
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the chat`,
      timestamp: Date.now(),
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      timestamp: Date.now(),
    });
    io.to(user.room).emit("roomData", {
      room: user.name,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the chat`,
        timestamp: Date.now(),
      });
    }
  });
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log("Server listening on port %d", PORT));
