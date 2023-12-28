import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ControlContainer from "../components/Room/ButtonContainer";
import style from "../css/room.module.css";
import TopProfile from "../components/Room/TopProfile";
import { io } from "socket.io-client";

const Room = () => {
  const location = useLocation();
  const roomType = location.state.room;
  // 2 values: create (friend) or join (stranger)

  const [control, setControl] = useState(null);

  const handleControl = (e) => {
    setControl(e.target.name);
  };

  useEffect(() => {
    // socket var
    const socket = io("http://localhost:5000");

    // socket events
    socket.emit(`${roomType}-room`);
    socket.on("room-created", (roomId) => {
      console.log(roomId);
    });

    // To close the prev Connection on every new reload
    return () => socket.close();
  });

  return (
    <>
      <div className={style.room}>
        <div className={style.left}>
          <TopProfile right={false} />

          {control ? (
            <img
              src={`/${control}.png`}
              alt="Control Hand"
              className={style.control}
            />
          ) : (
            <div></div>
          )}
        </div>
        <hr className={style.hr} />
        <div className={style.right}>
          <TopProfile right={true} />

          {control ? (
            <img
              src={`/${control}.png`}
              alt="Control Hand"
              className={style.controlR}
            />
          ) : (
            <div></div>
          )}
        </div>
        <ControlContainer handleControl={handleControl} />
      </div>
    </>
  );
};

export default Room;
