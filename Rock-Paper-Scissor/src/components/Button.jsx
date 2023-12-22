import React from "react";
import { useContext } from "react";
import SocketContext from "../../context/SocketContext";
import styles from "../styles.module.css";

const Button = ({ name, style, type }) => {
  const { socket, navigate } = useContext(SocketContext);

  const handleChange = (type) => {
    socket.emit("room:create", { type }, (err, res) => {
      navigate(`/room/${roomID}`);
    });
  };
  return (
    <>
      <button className={style.btn} onClick={() => handleChange()}>
        {name}
      </button>
    </>
  );
};

export default Button;
