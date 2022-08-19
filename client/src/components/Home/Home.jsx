import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs, getTemperaments, GET_DOGS } from "../../actions";
import { filters, dynamicSelect, renderDog } from "../../helpers";
import DogCard from "../DogCard/DogCard";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";

function Home() {
  const [value, setValue] = useState("a-z");
  const [temp, setTemp] = useState("All");
  const [source, setSource] = useState("All");
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const allDogs = dogs;
  filters(dogs, value);
  useEffect(() => {
    if (dogs.length === 0 && temperaments.length === 0) {
      dispatch(getTemperaments());
      dispatch(getDogs());
    }
  }, [dogs, value, dispatch, temperaments]);

  function handleSource(e) {
    setSource(e.target.value);
  }

  function tempFiltered(arr, temp) {
    if (temp === "All") {
      return allDogs;
    }
    if (temp !== "All")
      return arr?.filter((d) => d.temperament?.includes(temp));
  }

  function filterBySource() {
    if (source === "All") {
      return allDogs;
    }
    if (source !== "All") return dogs.filter((d) => typeof d.id === source);
  }
  const handleTemperaments = function (e) {
    setTemp(e.target.value);
    setCurrentPage(1);
  };

  const dogsBySource = filterBySource();
  const dogsByTemp = tempFiltered(dogsBySource, temp);
  // Get current posts
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div>
      Home
      <div>
        <Search />
      </div>
      <div>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={temp !== "All" ? dogsByTemp.length : dogsBySource.length}
          paginate={paginate}
        />
      </div>
      <select onChange={(e) => handleChange(e)}>
        <option defaultValue={""}>Order Alphabetically</option>
        <option value="a-z">Ascending: A-Z</option>
        <option value="z-a">Descending: Z-A</option>
      </select>
      <select onChange={(e) => handleChange(e)}>
        <option defaultValue={""}>Order by Weight</option>
        <option value="0-9">Ascending: 0-9</option>
        <option value="9-0">Descending: 9-0</option>
      </select>
      <select
        onChange={(e) => handleTemperaments(e)}
        className="select-temperament"
      >
        <option value={"All"} key={0}>
          All Temperaments
        </option>

        {dynamicSelect(temperaments)}
      </select>
      <select onChange={(e) => handleSource(e)}>
        <option value="All">All Dogs</option>
        <option value="number">API</option>
        <option value="string">Database</option>
      </select>
      <DogCard
        dogsByTemp={dogsByTemp}
        dogsBySource={dogsBySource}
        indexOfFirstDog={indexOfFirstDog}
        indexOfLastDog={indexOfLastDog}
      />
    </div>
  );
}

export default Home;
