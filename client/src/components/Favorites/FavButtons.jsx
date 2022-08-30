import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../actions";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import styles from "./Favorites.module.css";
function FavButtons({ dog, favorites }) {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const isFaved = favorites?.find((d) => d?.id === dog?.id);
  function handleRemove(e) {
    dispatch(removeFavorite([dog, user.sub]));
  }
  function handleAdd(e) {
    dispatch(addFavorite([dog, user.sub]));
  }

  return isFaved ? (
    <button className={styles.button} onClick={(e) => handleRemove(e)}>
      <FcLike />
    </button>
  ) : (
    <button className={styles.button} onClick={(e) => handleAdd(e)}>
      <FcLikePlaceholder />
    </button>
  );
}

export default FavButtons;
