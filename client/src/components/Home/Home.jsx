import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setCurrentPage, SET_CURRENT_PAGE } from "../../actions";
import { sortOrder, filterBySource, filterByTemp, init } from "../../helpers";
import DogCard from "../DogCard/DogCard";
import Empty from "../Empty/Empty";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";

function Home() {
  const [order, setOrder] = useState("a-z");
  const [temp, setTemp] = useState("All");
  const [source, setSource] = useState("All");
  const [searchParams] = useSearchParams();

  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const userReducer = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const currentPage = useSelector((state) => state.currentPage);
  const dogsPerPage = useSelector((state) => state.dogsPerPage);
  const allDogs = dogs; // a copy of all the dogs that won't mutate
  const dispatch = useDispatch();
  const query = searchParams.get("name");
  const page = parseInt(searchParams.get("page"));
  const { user } = useAuth0();
  const dogsBySource = filterBySource(dogs, allDogs, source);
  const dogsByTemp = filterByTemp(dogsBySource, allDogs, temp);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    let userData = user
      ? {
          id: user?.sub,
          name: user?.name,
        }
      : null;
    if (!dogs?.length || !favorites?.length) {
      init({
        dispatch,
        dogs,
        query,
        temperaments,
        userData,
        userReducer,
        favorites,
      });
    }

    if (page) {
      dispatch(setCurrentPage(page));
    }
    return () => {
      dispatch({ type: SET_CURRENT_PAGE, payload: 1 });
    };
  }, [
    dispatch,
    dogs,
    query,
    temperaments,
    userReducer,
    favorites,
    user,
    allDogs,
    dogsByTemp.length,
    page,
  ]);
  console.log(page);
  sortOrder(dogs, order);

  // Get dogs index for current page - for page 1: 0, 8, page 2: 8, 16;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explore Dog's World</h1>
      <Filters
        temperaments={temperaments}
        setOrder={setOrder}
        setSource={setSource}
        setTemp={setTemp}
        temp={temp}
      />
      <div className={styles.grid}>
        {!dogsByTemp.length && !isLoading ? (
          <Empty
            reset={true}
            setOrder={setOrder}
            setTemp={setTemp}
            setSource={setSource}
          />
        ) : temp !== "All" ? (
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
          allDogsLength={
            temp !== "All" ? dogsByTemp.length : dogsBySource.length
          }
        />
      </div>
    </div>
  );
}

export default Home;
