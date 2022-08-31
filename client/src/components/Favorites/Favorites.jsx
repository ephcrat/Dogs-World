import React from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { RenderDog } from "../../helpers";
import styles from "./Favorites.module.css";
import Empty from "../Empty/Empty";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const userReducer = useSelector((state) => state.user);
  const { user } = useAuth0();

  return user ? (
    <div>
      <h1 className={styles.username}>{userReducer.name} Favorite Dogs</h1>
      {RenderDog(favorites, "dogs")}
    </div>
  ) : (
    <Empty />
  );
}
export default Favorites;
