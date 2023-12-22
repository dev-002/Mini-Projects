import React from "react";
import Button from "../components/Button";
import Logo from "/Logo.png";
import Scissor from "/Scissor.png";
import Rock from "/Rock.png";
import styles from "../css/home.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.left}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        <img src={Scissor} alt="Scissor Hand" className={styles.scissor_hand} />
        <img src={Rock} alt="Rock Hand" className={styles.rock_hand} />

        <div className={styles.btn_container}>
          <Button
            name={"Play with Strangers"}
            type="button"
            style={styles.button}
          />
          <Button
            name={"Play with Friend"}
            type="button"
            style={styles.button}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
