import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";
import logo from "./logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import AuthButtons from "../Auth/AuthButtons";
import { getUser } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
function Navbar() {
  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  const userReducer = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  let userData = user
    ? {
        id: user?.sub,
        name: user?.name,
      }
    : null;

  // if (!Object.keys(userReducer).length && userData) dispatch(getUser(userData));

  return (
    <header className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="Dog's World logo" />
      <Search />
      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>{!isLoading && <AuthButtons />}</li>
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
          {Object.keys(userReducer).length && (
            <li className={styles.listItem}>
              <NavLink className={styles.listLink} to="/dogs/favorites">
                Favorites
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
