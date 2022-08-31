import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";
import logo from "./logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import AuthButtons from "../Auth/AuthButtons";
import { getDogs } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
function Navbar() {
  const { isLoading } = useAuth0();
  const userReducer = useSelector((state) => state.user);
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  !dogs && dispatch(getDogs());
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={logo} alt="Dog's World logo" />
        </div>
        <div className={styles.search}>
          <Search />
        </div>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <NavLink className={styles.listLink} to="/dogs/">
              Home
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink className={styles.listLink} to="/dogs/create-dog">
              Create Breed
            </NavLink>
          </li>
          {Object.keys(userReducer).length ? (
            <li className={styles.listItem}>
              <NavLink className={styles.listLink} to="/dogs/favorites">
                Favorites
              </NavLink>
            </li>
          ) : (
            <></>
          )}
          {!isLoading && (
            <li className={styles.button}>
              <AuthButtons />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
