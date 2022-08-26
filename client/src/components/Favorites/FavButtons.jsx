import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../actions";
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
    <button onClick={(e) => handleRemove(e)}>Faved</button>
  ) : (
    <button onClick={(e) => handleAdd(e)}>Fav</button>
  );
}

export default FavButtons;
