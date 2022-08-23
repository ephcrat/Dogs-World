import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs, getTemperaments } from "../../actions";
import { sortOrder, filterBySource, filterByTemp } from "../../helpers";
import DogCard from "../DogCard/DogCard";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";

function Home() {
  const [order, setOrder] = useState("a-z");
  const [temp, setTemp] = useState("All");
  const [source, setSource] = useState("All");
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const allDogs = dogs;

  if (dogs.length === 0 && temperaments.length === 0) {
    dispatch(getTemperaments());
    dispatch(getDogs());
  }

  sortOrder(dogs, order);

  const dogsBySource = filterBySource(dogs, allDogs, source);
  const dogsByTemp = filterByTemp(dogsBySource, allDogs, temp);
  // Get current dogs
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      {/* <Search /> */}

      <Filters
        temperaments={temperaments}
        setCurrentPage={setCurrentPage}
        setOrder={setOrder}
        setSource={setSource}
        setTemp={setTemp}
      />
      <div className={styles.grid}>
        {temp !== "All" ? (
          <DogCard
            arr={dogsByTemp}
            indexOfFirstDog={indexOfFirstDog}
            indexOfLastDog={indexOfLastDog}
          />
        ) : (
          <DogCard
            arr={dogsBySource}
            indexOfFirstDog={indexOfFirstDog}
            indexOfLastDog={indexOfLastDog}
          />
        )}
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        allDogsLength={temp !== "All" ? dogsByTemp.length : dogsBySource.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Home;
