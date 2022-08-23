import React from "react";

function Input({ data, handleChange }) {
  return (
    <div>
      <div>
        <label>Name</label>
        <input
          name={"name"}
          placeholder="Name"
          value={data.name}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Minimum Weight</label>
        <input
          name={"min_weight"}
          placeholder="Kilograms"
          value={data.min_weight}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Maximum Weight </label>
        <input
          name={"max_weight"}
          placeholder="Kilograms"
          value={data.max_weight}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Minimum Height</label>
        <input
          name={"min_height"}
          placeholder="Centimeters"
          value={data.min_height}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Maximum Height</label>
        <input
          name={"max_height"}
          placeholder="Centimeters"
          value={data.max_height}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <label>Minimum Life Span</label>
      <input
        name={"min_life_span"}
        placeholder="Years"
        value={data.min_life_span}
        required="required"
        onChange={(e) => handleChange(e)}
      />
      <div>
        <label>Maximum Life Span</label>
        <input
          name={"max_life_span"}
          placeholder="Years"
          value={data.max_life_span}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Image</label>
        <input
          name={"image"}
          placeholder="URL"
          value={data.image}
          required="required"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Origin</label>
        <input
          name={"origin"}
          placeholder="Country"
          value={data.origin}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}

export default Input;
