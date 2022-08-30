import React from "react";
import { RenderDog } from "../../helpers";

function DogCard({ arr, indexOfFirstDog, indexOfLastDog }) {
  function currentDog(arr, indexFirst = 0, indexLast = 8) {
    //arr = array from the redux state (dogs) indexFirst = index of the first element depending on the current page number (page 1 = 0, page 2 = 8) indexLast = index of the next page first element (page 1 = 8, page 2 = 16)
    return arr.slice(indexFirst, indexLast); //slice the array eight by eight, it'll cut from the first index to the last index minus one (page 1 = 0-7, page 2 = 8-15)
  }
  return (
    <>{RenderDog(currentDog(arr, indexOfFirstDog, indexOfLastDog), "dogs")}</>
  );
}

export default DogCard;
