import React from "react";
import styles from "./Input.module.css";
import { DynamicSelect } from "../../helpers";
import { useSelector } from "react-redux";

function Input({ data, handleChange, handleTemperaments, error, response }) {
  const temperaments = useSelector((state) => state.temperaments);
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          name={"name"}
          placeholder="Breed Name"
          value={data.name}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.div}>
        <label className={styles.label}>Image</label>
        <input
          className={styles.input}
          name={"image"}
          placeholder="URL"
          value={data.image}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.div}>
        <label className={styles.label}>Origin</label>
        <input
          className={styles.input}
          name={"origin"}
          placeholder="Country"
          value={data.origin}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.sliderLabel}>
          <label> Weight (Kg)</label>
        </div>
        <div className={styles.sliderContainer}>
          <span className={styles.values}>{data.min_weight}</span>
          <input
            type="range"
            min="0"
            max="120"
            step="1"
            className={styles.thumbOne}
            name={"min_weight"}
            value={data.min_weight}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="range"
            min="0"
            max="120"
            step="1"
            className={styles.thumbTwo}
            name={"max_weight"}
            value={data.max_weight}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <div className={styles.slider}>
            <div className={styles.sliderTrack} />
            <div className={styles.sliderRange} />
          </div>
          <span className={styles.values}>{data.max_weight}</span>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.sliderLabel}>
          <label> Height (Centimeters)</label>
        </div>
        <div className={styles.sliderContainer}>
          <span className={styles.values}>{data.min_height}</span>
          <input
            type="range"
            min="0"
            max="300"
            step="1"
            className={styles.thumbOne}
            name={"min_height"}
            value={data.min_height}
            required="required"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="range"
            min="0"
            max="300"
            step="1"
            className={styles.thumbTwo}
            name={"max_height"}
            value={data.max_height}
            required="required"
            onChange={(e) => handleChange(e)}
          />

          <div className={styles.slider}>
            <div className={styles.sliderTrack} />
            <div className={styles.sliderRange} />
          </div>
          <span className={styles.values}>{data.max_height}</span>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.sliderLabel}>
          <label> Lifespan (Years)</label>
        </div>
        <div className={styles.sliderContainer}>
          <span className={styles.values}>{data.min_life_span}</span>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            className={styles.thumbOne}
            name={"min_life_span"}
            value={data.min_life_span}
            required="required"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="range"
            min="0"
            max="20"
            step="1"
            className={styles.thumbTwo}
            name={"max_life_span"}
            value={data.max_life_span}
            required="required"
            onChange={(e) => handleChange(e)}
          />

          <div className={styles.slider}>
            <div className={styles.sliderTrack} />
            <div className={styles.sliderRange} />
          </div>
          <span className={styles.values}>{data.max_life_span}</span>
        </div>
      </div>
      <div className={styles.sliderLabel} style={{ marginTop: "1rem" }}>
        <label>
          {" "}
          Temperaments <br /> (Select at least one)
        </label>
      </div>
      <div className={styles.divCheckbox}>
        <ul className={styles.checkbox}>
          {DynamicSelect(temperaments, handleTemperaments)}
        </ul>
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "1rem",
          fontWeight: 600,
          fontSize: "1.2rem",
        }}
      >
        {error ? <p style={{ color: "red" }}>{error}</p> : <p>{response}</p>}
      </div>
      <div className={styles.button}>
        <button type="submit">Create Dog</button>
      </div>
    </div>
  );
}

export default Input;
