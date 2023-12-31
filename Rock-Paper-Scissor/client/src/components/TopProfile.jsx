import React from "react";
import style from "../css/room.module.css";
import { Container } from "react-bootstrap";

const TopProfile = ({ right, points }) => {
  return (
    <Container className="w-100" style={{ margin: "0.5em 1em" }}>
      <i
        className={
          (right ? style.profileR : style.profile) + " fa-solid fa-user"
        }
      ></i>
      {Array.from({ length: points }, (_, index) => (
        <i
          key={index}
          className={(right ? style.starR : style.star) + " fa-solid fa-star"}
        ></i>
      ))}

      {Array.from({ length: 3 - points }, (_, index) => (
        <i
          key={index}
          className={(right ? style.starR : style.star) + " fa-regular fa-star"}
        ></i>
      ))}
    </Container>
  );
};

export default TopProfile;
