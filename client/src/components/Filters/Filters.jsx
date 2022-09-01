import React from "react";
import { useSearchParams } from "react-router-dom";

import { DynamicSelect } from "../../helpers";
import styles from "./Filters.module.css";

function Filters({ temperaments, setOrder, setSource, setTemp, isReset, setReset}) {
  const [, setSearchParams] = useSearchParams();
  function handleSource(e) {
    setSource(e.target.value);
    setSearchParams({ page: 1 });
  }

  const handleTemperaments = function (e) {
    setTemp(e.target.value);
    setSearchParams({ page: 1 });
  };

  function handleOrder(e) {
    setOrder(e.target.value);
  }

  return (
    <div key={isReset}>
      <div className={styles.filters}>
        <select
          onChange={(e) => handleOrder(e)}
          className={styles.orderLetters}
        >
          <option defaultValue={""}>Order Alphabetically</option>
          <option value="a-z">Ascending: A-Z</option>
          <option value="z-a">Descending: Z-A</option>
        </select>
        <select
          onChange={(e) => handleOrder(e)}
          className={styles.orderNumbers}
        >
          <option defaultValue={""}>Order by Weight</option>
          <option value="0-9">Ascending: 0-9</option>
          <option value="9-0">Descending: 9-0</option>
        </select>

        <select
          onChange={(e) => {
            handleTemperaments(e);
          }}
          className={styles.filterTemp}
        >
          <option value={"All"} key={0}>
            All Temperaments
          </option>

          {DynamicSelect(temperaments)}
        </select>
        <select
          className={styles.filterSource}
          onChange={(e) => handleSource(e)}
        >
          <option value="All">All Dogs</option>
          <option value="number">API</option>
          <option value="string">Database</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
