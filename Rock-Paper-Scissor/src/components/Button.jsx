import React from "react";
import styles from "../css/home.module.css";

const Button = ({ name, type }) => {
  function handleChange() {
    console.log("Button Clicked");
  }

  return (
    <>
      <button className={styles.btn} onClick={() => handleChange()}>
        {name}
      </button>
    </>
  );
};

export default Button;
