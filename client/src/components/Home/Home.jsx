import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ConnPool from "webtorrent/lib/conn-pool";
import { getDogs, getFavorites, getTemperaments, getUser } from "../../actions";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const userReducer = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const allDogs = dogs;
  const query = searchParams.get("name");
  const { user } = useAuth0();

  let userData = user
    ? {
        id: user?.sub,
        name: user?.name,
      }
    : null;

  if (dogs.length === 0 && temperaments.length === 0 && !query) {
    dispatch(getTemperaments());
    dispatch(getDogs());
  }

  if (dogs.length === 0 && temperaments.length === 0 && query) {
    dispatch(getTemperaments());
    dispatch(getDogs(query));
  }

  if (userData && userReducer.length === 0) {
    dispatch(getUser(userData));
  }
  console.log(userReducer);

  if (allDogs && userReducer.favorites && favorites.length === 0) {
    const payload = [userReducer, dogs];
    dispatch(getFavorites(payload));
  }
  console.log(favorites);
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
      <h1 className={styles.title}>Explore Dog's World</h1>
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
      <div className={styles.pages}>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogsLength={
            temp !== "All" ? dogsByTemp.length : dogsBySource.length
          }
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Home;
