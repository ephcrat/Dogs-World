import React from "react";
import { currentDog, renderDog } from "../../helpers";

function DogCard({
  temp,
  dogsByTemp,
  dogsBySource,
  indexOfFirstDog,
  indexOfLastDog,
}) {
  return (
    <>
      <ul>
        {temp !== "All"
          ? renderDog(
              currentDog(dogsByTemp, indexOfFirstDog, indexOfLastDog),
              "dogs"
            )
          : renderDog(
              currentDog(dogsBySource, indexOfFirstDog, indexOfLastDog),
              "dogs"
            )}
      </ul>
    </>
  );
}

export default DogCard;
