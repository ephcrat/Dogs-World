import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import img1 from "./img-1.png";
import img3 from "./img-3.png";

function Landing() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.img3} src={img3} alt="Brown dog" />
      <h1>Explore world's best dogs</h1>
      <img className={styles.img1} src={img1} alt="Black dog" />
      <Link to={"/dogs"}>
        <button className={styles.button}>Explore Dogs</button>
      </Link>
    </div>
  );
}

export default Landing;
