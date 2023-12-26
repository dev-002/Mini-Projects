import React from "react";
import style from "../../css/room.module.css";

const ButtonContainer = ({ handleControl }) => {
  return (
    <div className={style.controls_div}>
      <button
        className={style.scissor_button}
        onClick={(e) => handleControl(e)}
        name="Scissor"
      ></button>
      <button
        className={style.paper_button}
        onClick={(e) => handleControl(e)}
        name="Paper"
      ></button>
      <button
        className={style.rock_button}
        onClick={(e) => handleControl(e)}
        name="Rock"
      ></button>
    </div>
  );
};

export default ButtonContainer;
