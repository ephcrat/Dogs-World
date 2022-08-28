import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { getFavorites, getUser } from "../../actions";
import styles from "../DogCard/DogCard.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { RenderDog } from "../DogCard/DogCard";
function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const userReducer = useSelector((state) => state.user);
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);

  return user ? (
    <div>
      <h1>{userReducer.name} Favorite Dogs</h1>
      {RenderDog(favorites, "dogs")}
    </div>
  ) : (
    <div>Not found</div>
  );
}
export default Favorites;
