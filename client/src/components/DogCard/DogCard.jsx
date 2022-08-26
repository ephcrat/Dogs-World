import React from "react";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addFavorite } from "../../actions";
import FavButtons from "../Favorites/FavButtons";
export function RenderDog(array, route) {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  return (
    <>
      <ul className={styles.card}>
        {array?.map((dog) => {
          // const isFaved = favorites?.find((d) => d?.id === dog?.id);
          return (
            <li className={styles.element} key={dog?.id}>
              <Link
                to={`/${route}/${encodeURIComponent(dog?.name).replace(
                  /%20/g,
                  "-"
                )}`} //format the space separation to URI (%20) and replace it with a hypen https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
              >
                <img
                  className={styles.image}
                  src={dog?.image}
                  alt={dog?.name}
                />
                <h2> {dog?.name}</h2>
                <p>{dog?.temperament?.join(" | ")}</p>
              </Link>
              {user && <FavButtons dog={dog} favorites={favorites} />}
            </li> //if an user is logged in, show the fav button. else hide it
          );
        })}
      </ul>
    </>
  );
}
function currentDog(arr, indexFirst = 0, indexLast = 8) {
  //arr = array from the redux state (dogs) indexFirst = index of the first element depending on the current page number (page 1 = 0, page 2 = 8) indexLast = index of the next page first element (page 1 = 8, page 2 = 16)
  return arr.slice(indexFirst, indexLast); //slice the array eight by eight, it'll cut from the first index to the last index minus one (page 1 = 0-7, page 2 = 8-15)
}

function DogCard({ arr, indexOfFirstDog, indexOfLastDog }) {
  return (
    <>{RenderDog(currentDog(arr, indexOfFirstDog, indexOfLastDog), "dogs")}</>
  );
}

export default DogCard;
