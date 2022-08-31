import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getDogs } from "../../actions";

import axios from "axios";
import Input from "../Input/Input";
import styles from "./CreateDog.module.css";

function CreateDog() {
  const emptyData = {
    name: "",
    min_weight: 1,
    max_weight: 100,
    min_height: 1,
    max_height: 150,
    min_life_span: 1,
    max_life_span: 20,
    origin: "",
    image: "",
    temperament: [],
  };
  const [data, setData] = useState(emptyData);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const regExLetters = /^[a-zA-Z\s]*$/;
  const regExURL =
    /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm; //https://stackoverflow.com/a/55468411/19504474
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  if (temperaments.length === 0) {
    dispatch(getTemperaments());
  }

  function handleChange(e) {
    setData((prev) => {
      if (!e.target.value.length) setError(null);
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleTemperaments(e) {
    if (!data.temperament.includes(e.target.value)) {
      setData((prev) => {
        return {
          ...prev,
          temperament: [...data.temperament, e.target.value],
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          temperament: data.temperament.filter((t) => t !== e.target.value),
        };
      });
    }
  }
  function handleDelete(e) {
    setData((prev) => {
      return {
        ...prev,
        temperament: data.temperament.filter((t) => t !== e.target.value),
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      if (!data.temperament.length)
        return setError("At least 1 temperament is required");
      if (!regExLetters.test(data.name) || data.name.length < 3)
        return setError(
          "The name cannot contain numbers or special characters and must have a minimum length of 3 characters"
        );
      if (
        isNaN(+data.min_weight) ||
        isNaN(+data.max_weight) ||
        +data.min_weight > +data.max_weight
      )
        return setError(
          "The minimum weight cannot be higher than the maximum weight and has to be a number"
        );
      if (
        isNaN(+data.min_height) ??
        isNaN(+data.max_height) ??
        +data.min_height > +data.max_height
      )
        return setError(
          "The minimum height cannot be higher than the maximum height and has to be a number"
        );
      if (
        isNaN(+data.min_life_span) ??
        isNaN(+data.max_life_span) ??
        +data.min_life_span > +data.max_life_span
      )
        return setError(
          "The minimum lifespan cannot be higher than the maximum lifespan and has to be a number"
        );

      if (!regExLetters.test(data.origin) || data.origin.length < 3)
        return setError(
          "The origin cannot contain numbers or special characters and must have a minimum length of 3 characters"
        );
      if (!regExURL.test(data.image))
        return setError("The image has to be a URL");
      if (!error) {
        const post = await axios.post("/dogs", data);
        setResponse(post.data);
        setData({ ...emptyData, temperament: data.temperament });
        dispatch(getDogs());
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <h1 style={{ textAlign: "center" }}>Create a Breed</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.formContainer}>
          <Input
            data={data}
            handleChange={handleChange}
            handleTemperaments={handleTemperaments}
            handleDelete={handleDelete}
            error={error}
            setError={setError}
            response={response}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateDog;
