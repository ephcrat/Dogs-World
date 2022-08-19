import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../actions";
import { dynamicSelect } from "../../helpers";
import axios from "axios";

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
  useEffect(() => {
    if (temperaments.length === 0) {
      dispatch(getTemperaments());
    }
  }, [dispatch, temperaments]);

  function handleChange(e) {
    setData((prev) => {
      // if (
      //   (e.target.name.includes("weight") && isNaN(parseInt(e.target.value))) ||
      //   (e.target.name.includes("height") && isNaN(parseInt(e.target.value))) ||
      //   (e.target.name.includes("life") && isNaN(parseInt(e.target.value)))
      // ) {
      //   setError("Weight, Height and Life Span has to be a number");
      // }
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
        isNaN(parseInt(data.min_weight)) ||
        isNaN(parseInt(data.max_weight)) ||
        parseInt(data.min_weight) > parseInt(data.max_weight)
      )
        return setError(
          "The minimum weight cannot be higher than the maximum weight and has to be a number"
        );
      if (
        isNaN(parseInt(data.min_height)) ??
        isNaN(parseInt(data.max_height)) ??
        parseInt(data.min_height) > parseInt(data.max_height)
      )
        return setError(
          "The minimum height cannot be higher than the maximum height and has to be a number"
        );
      if (
        isNaN(parseInt(data.min_life_span)) ??
        isNaN(parseInt(data.max_life_span)) ??
        parseInt(data.min_life_span) > parseInt(data.max_life_span)
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
          <label>Name</label>
          <input
            name={"name"}
            placeholder="Name"
            value={data.name}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <label>Minimum Weight</label>
          <input
            name={"min_weight"}
            placeholder="Kilograms"
            value={data.min_weight}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <label>Maximum Weight </label>
          <input
            name={"max_weight"}
            placeholder="Kilograms"
            value={data.max_weight}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <label>Minimum Height</label>
          <input
            name={"min_height"}
            placeholder="Centimeters"
            value={data.min_height}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <label>Maximum Height</label>
          <input
            name={"max_height"}
            placeholder="Centimeters"
            value={data.max_height}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <label>Minimum Life Span</label>
          <input
            name={"min_life_span"}
            placeholder="Years"
            value={data.min_life_span}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <label>Maximum Life Span</label>
          <input
            name={"max_life_span"}
            placeholder="Years"
            value={data.max_life_span}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <label>Image</label>
          <input
            name={"image"}
            placeholder="URL"
            value={data.image}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <label>Origin</label>
          <input
            name={"origin"}
            placeholder="Country"
            value={data.origin}
            onChange={(e) => handleChange(e)}
          />
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
