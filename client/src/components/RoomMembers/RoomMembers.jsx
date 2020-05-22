import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";

import "./RoomMembers.css";

const RoomMembers = ({ users }) => (
  <div className="roomMembers">
    <div>
      <h4>
        Built by Itiel Maimon{" "}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h4>
    </div>
    {users ? (
      <div>
        <h3>Users in chat:</h3>
        <div className="activeContainer">
          <h4>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <span />
                <img alt="Online Icon" src={onlineIcon} />
                {name}
              </div>
            ))}
          </h4>
        </div>
      </div>
    ) : null}
  </div>
);

export default RoomMembers;
