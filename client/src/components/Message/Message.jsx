import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";

const Message = ({ message: { username, text, timestamp }, name }) => {
  let isSentByCurrentUser = false;

  const trimedNamed = name.trim().toLowerCase();

  if (username === trimedNamed) {
    isSentByCurrentUser = true;
  }

  function msToTime(milliseconds) {
    const hours = `0${new Date(milliseconds).getHours()}`.slice(-2);
    const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);

    return `${hours}:${minutes}`;
  }

  return username === "admin" ? (
    <div className="adminMessageContainer justifyCenter">
      <div className="adminMessageBox backgroundYellow">
        <p className="adminMessageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        <p className="timestampText mt-0 colorWhite">{msToTime(timestamp)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="fromUserText">{username}</p>
        <p className="messageText colorDark mt-0">{ReactEmoji.emojify(text)}</p>
        <p className="timestampText mt-0">{msToTime(timestamp)}</p>
      </div>
    </div>
  );
};

export default Message;
