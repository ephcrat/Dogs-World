import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDogDetails, GET_DOG_DETAILS } from "../../actions";
import styles from "./DogDetails.module.css";
import Empty from "../Empty/Empty";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Loading } from "../Loading/Loading";

function DogDetails() {
  let { name } = useParams();

  let nameFormated = name
    .split("-")
    .map((n) => `${n[0].toUpperCase()}${n.slice(1)}`)
    .join(" ");
  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.dogDetails);
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.isLoading);
  useEffect(() => {
    if (name) {
      dispatch(getDogDetails(nameFormated));
    }
    return () => {
      dispatch({ type: GET_DOG_DETAILS, payload: {} });
    };
  }, [dispatch, nameFormated, name]);

  const handleClick = function () {
    navigate(-1, { replace: true });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !Object.keys(dogDetails).length) {
    return <Empty />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.goBack}>
        {" "}
        <button
          styles={{ cursor: "pointer", paddingTop: "rem" }}
          onClick={() => handleClick()}
        >
          <IoArrowBackCircleSharp />
        </button>
      </div>
      <div className={styles.image}>
        <img src={dogDetails?.image} alt={dogDetails?.name} />
      </div>
      <div className={styles.detailsDiv}>
        <div className={styles.name}>
          <h1>{dogDetails?.name}</h1>
        </div>
        {/* <br /> */}
        <ul className={styles.details}>
          <li className={styles.weight}>
            <label>Weight (Kg):</label> <br /> <p>{dogDetails?.weight}</p>
          </li>
          <li className={styles.height}>
            <label>Height (cm):</label> <br /> <p>{dogDetails?.height}</p>
          </li>
          <li className={styles.lifespan}>
            <label>Lifespan:</label> <br /> <p>{dogDetails?.life_span}</p>
          </li>
        </ul>
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            marginTop: "2rem",
          }}
        >
          Temperaments:
        </h2>
        <div className={styles.temperament}>
          {dogDetails.temperament?.map((t) => (
            <p>{t}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DogDetails;
