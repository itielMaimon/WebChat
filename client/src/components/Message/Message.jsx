import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimedNamed = name.trim().toLowerCase();

  if (user === trimedNamed) {
    isSentByCurrentUser = true;
  }

  console.log(user);

  return user === "admin" ? (
    <div className="adminMessageContainer justifyCenter">
      <div className="adminMessageBox backgroundYellow">
        <p className="adminMessageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimedNamed}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="sentText pr-10">{user}</p>
        <p className="messageText colorDark mt-0">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
};

export default Message;
