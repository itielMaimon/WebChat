import React from "react";

import "./Rooms.css";

const Rooms = ({ rooms, user }) => (
  <div className="rooms">
    <h4>Create or join a room</h4>
    <button className="button mt-20" type="submit">
      Create
    </button>
    {rooms ? (
      <div>
        <h4>Your rooms</h4>
        <div className="activeContainer">
          <h4>
            {rooms.map(({ _id, roomname }) => (
              <div key={_id}>
                <button
                  className="room"
                  onClick={(event) =>
                    !roomname
                      ? event.preventDefault()
                      : (window.location.href = `./chat?name=${user}&room=${roomname}`)
                  }
                >
                  {roomname}
                </button>
              </div>
            ))}
          </h4>
        </div>
      </div>
    ) : null}
  </div>
);

export default Rooms;
