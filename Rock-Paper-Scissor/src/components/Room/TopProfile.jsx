import React from "react";
import style from "../../css/room.module.css";

const TopProfile = ({ right }) => {
  return (
    <div className={style.topProfile}>
      <i
        className={
          (right ? style.profileR : style.profile) + " fa-solid fa-user"
        }
      ></i>
      <i
        className={(right ? style.starR : style.star) + " fa-solid fa-star"}
      ></i>
      <i
        className={(right ? style.starR : style.star) + " fa-regular fa-star"}
      ></i>
      <i
        className={(right ? style.starR : style.star) + " fa-regular fa-star"}
      ></i>
    </div>
  );
};

export default TopProfile;
