const Room = require("./models/room");

const joinRoom = async (user) => {
  const roomsList = await Room.find().sort({ createdAt: -1 });

  const exisitingRoom = roomsList.find((room) => room.roomname === user.room);

  if (exisitingRoom) {
    userJoinRoom(exisitingRoom, user);

    return roomsList;
  }

  const usersInRoom = [{ id: user.id, username: user.name }];

  const room = new Room({
    roomname: user.room,
    users: usersInRoom,
    createdAt: Date.now(),
  });

  await room.save();

  roomsList.push(room);

  return roomsList;
};

const userJoinRoom = async (room, user) => {
  const exisitingUser = room.users.find(
    (roomUser) => roomUser.username === user.name
  );

  if (exisitingUser) {
    return;
  }

  room.users.push({ id: user.id, username: user.name });

  await room.collection.updateOne(
    { _id: room._id },
    { $set: { users: room.users } }
  );
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { joinRoom, removeUser, getUser, getUsersInRoom };
