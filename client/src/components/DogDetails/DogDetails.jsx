import { nameprep } from "ethers/lib/utils";
import React from "react";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetails, GET_DOG_DETAILS } from "../../actions";
import styles from "./DogDetails.module.css";

function DogDetails() {
  let { name } = useParams();

  let nameFormated = name
    .split("-")
    .map((n) => `${n[0].toUpperCase()}${n.slice(1)}`)
    .join(" ");
  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.dogDetails);

  useEffect(() => {
    if (name) {
      dispatch(getDogDetails(nameFormated));
    }
    return () => {
      dispatch({ type: GET_DOG_DETAILS, payload: {} });
    };
  }, [dispatch, nameFormated, name]);

  return (
    <div className={styles.container}>
      DogDetails
      <ul className={styles.details}>
        <li>
          {" "}
          <img
            className={styles.image}
            src={dogDetails?.image}
            alt={dogDetails?.name}
          />
        </li>
        <li className={styles.name}>
          <h1>{dogDetails?.name}</h1>
        </li>
        <li>{dogDetails?.weight}</li>
      </ul>
    </div>
  );
}

export default DogDetails;
