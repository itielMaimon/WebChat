import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./../InfoBar/InfoBar";
import Input from "./../Input/Input";
import Messages from "./../Messages/Messages";
import RoomMembers from "./../RoomMembers/RoomMembers";
import Rooms from "../Rooms/Rooms";
import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  const [rooms, setRooms] = useState("");
  const ENDPOINT = "localhost:5000";
  //const ENDPOINT = "https://react-web-chat-app.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("userData", ({ rooms }) => {
      setRooms(rooms);
    });

    socket.on("roomUsersData", ({ users }) => {
      setUsers(users);
    });

    socket.on("roomMessagesData", ({ messages }) => {
      setMessages(messages);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <Rooms rooms={rooms} user={name}></Rooms>
      <RoomMembers users={users} />
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
