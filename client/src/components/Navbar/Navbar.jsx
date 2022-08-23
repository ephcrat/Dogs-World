import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";
import logo from "./logo.png";
function Navbar() {
  return (
    <header className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="Dog's World logo" />
      <Search />
      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <NavLink className={styles.listLink} to="/dogs/">
              Home
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink className={styles.listLink} to="/dogs">
              About
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink className={styles.listLink} to="/dogs/create-dog">
              Create Dog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
