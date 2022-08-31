import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import img1 from "./img-1.png";
import img2 from "./img-2.png";
import img4 from "./img-4.png";
import logo from "../Navbar/logo.png";

function Landing() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.image2}>
        <img className={styles.img2} src={img2} alt="Brown dog left" />
      </div>
      <div className={styles.image1Div}>
        <img className={styles.img1} src={img1} alt="Black dog" />
      </div>
      <div className={styles.image4Div}>
        <img className={styles.img4} src={img4} alt="Brown dog right" />
      </div>
      <Link to={"/dogs"}>
        <div className={styles.buttonDiv}>
          <button className={styles.button}>Explore Dogs</button>
        </div>
      </Link>
    </div>
  );
}

export default Landing;
