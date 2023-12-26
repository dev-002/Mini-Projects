import React, { useState } from "react";
import ControlContainer from "../components/Room/ButtonContainer";
import style from "../css/room.module.css";
import TopProfile from "../components/Room/TopProfile";

const Room = () => {
  const [control, setControl] = useState(null);
  const handleControl = (e) => {
    setControl(e.target.name);
  };
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
