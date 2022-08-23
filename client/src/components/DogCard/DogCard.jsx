import React from "react";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";

function renderDog(array, route) {
  return (
    <>
      <ul className={styles.card}>
        {array?.map((dog) => (
          <li className={styles.element} key={dog.id}>
            <Link
              to={`/${route}/${encodeURIComponent(dog.name).replace(
                /%20/g,
                "-"
              )}`} //format the space separation to URI (%20) and replace it with a hypen https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
            >
              <img
                className={styles.image}
                style={{ maxWidth: "300px", maxHeight: "300px" }}
                src={dog.image}
                alt={dog.name}
              />
              <h2> {dog.name}</h2>
            </Link>
          </li>
        ))}
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
    <>
      <ul>
        {renderDog(currentDog(arr, indexOfFirstDog, indexOfLastDog), "dogs")}
      </ul>
    </>
  );
}

export default DogCard;
