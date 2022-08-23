import React from "react";
import { dynamicSelect } from "../../helpers";
import styles from "./Filters.module.css";

function Filters({
  temperaments,
  setCurrentPage,
  setOrder,
  setSource,
  setTemp,
}) {
  function handleSource(e) {
    setSource(e.target.value);
  }

  const handleTemperaments = function (e) {
    setTemp(e.target.value);
    setCurrentPage(1);
  };

  function handleOrder(e) {
    setOrder(e.target.value);
  }

  return (
    <div className={styles.filter}>
      <div className={styles.select}>
        <select onChange={(e) => handleOrder(e)}>
          <option defaultValue={""}>Order Alphabetically</option>
          <option value="a-z">Ascending: A-Z</option>
          <option value="z-a">Descending: Z-A</option>
        </select>
      </div>
      <div className={styles.select}>
        <select onChange={(e) => handleOrder(e)}>
          <option defaultValue={""}>Order by Weight</option>
          <option value="0-9">Ascending: 0-9</option>
          <option value="9-0">Descending: 9-0</option>
        </select>
      </div>
      <div className={styles.select}>
        <select
          onChange={(e) => handleTemperaments(e)}
          className="select-temperament"
        >
          <option value={"All"} key={0}>
            All Temperaments
          </option>

          {dynamicSelect(temperaments)}
        </select>
      </div>
      <div className={styles.select}>
        <select onChange={(e) => handleSource(e)}>
          <option value="All">All Dogs</option>
          <option value="number">API</option>
          <option value="string">Database</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
