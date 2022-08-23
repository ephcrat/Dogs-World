import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../actions";
import { dynamicSelect } from "../../helpers";
import axios from "axios";
import Input from "../Input/Input";

function CreateDog() {
  const emptyData = {
    name: "",
    min_weight: "",
    max_weight: "",
    min_height: "",
    max_height: "",
    min_life_span: "",
    max_life_span: "",
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
      if (e.target.value === "") setError(null);
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
    if (error) throw new Error(error);
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
          "The minimum life_span cannot be higher than the maximum life_span and has to be a number"
        );

      if (!regExLetters.test(data.origin) || data.origin.length < 3)
        return setError(
          "The origin cannot contain numbers or special characters and must have a minimum length of 3 characters"
        );
      if (!regExURL.test(data.image))
        return setError("The image has to be a URL");
      setError(null);
      const post = await axios.post("/dogs", data);
      setResponse(post.data);
      setData(emptyData);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Create Dog</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <div>{error ? error : response}</div>
          <Input data={data} handleChange={handleChange} />
          <div>
            <select onChange={(e) => handleTemperaments(e)}>
              <option>Temperaments</option>
              {dynamicSelect(temperaments)}
            </select>
          </div>
          <div>
            {data.temperament?.map((t) => {
              return (
                <div key={t}>
                  <p>{t}</p>
                  <button value={t} onClick={(e) => handleDelete(e)}>
                    x
                  </button>
                </div>
              );
            })}
          </div>
          <button type="submit">Create Dog</button>
        </div>
      </form>
    </div>
  );
}

export default CreateDog;
