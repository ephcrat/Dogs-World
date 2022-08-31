import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteDog,
  getDogs,
  getFavorites,
  getTemperaments,
  getUser,
  SET_CURRENT_PAGE,
} from "../actions";
import FavButtons from "../components/Favorites/FavButtons";
import styles from "../components/DogCard/DogCard.module.css";
import img from "../components/Empty/img.png";
import axios from "axios";
import { Loading } from "../components/Loading/Loading";
import Empty from "../components/Empty/Empty";
import { MdDelete } from "react-icons/md";
export function sortOrder(arr, value) {
  if (!arr) return;
  if (value !== "") {
    if (value === "a-z") {
      return arr.sort((a, b) => a.name.localeCompare(b.name)); //localeCompare will act as the compare function of the sort, it'll return -1 if a is lower than b in alphabetical order, 1 if it's higher, and 0 if equal
    }
    if (value === "z-a") {
      return arr.sort((a, b) => -1 * a.name.localeCompare(b.name)); //same as above but in reverse order
    }

    if (value === "0-9") {
      return arr.sort(
        (a, b) => a.weight[0] + a.weight[1] - (b?.weight[0] + b?.weight[1])
      );
    }

    if (value === "9-0") {
      return arr.sort(
        (a, b) => b.weight[0] + b.weight[1] - (a.weight[0] + a.weight[1])
      );
    }
  }
  return arr;
}

export function DynamicSelect(arr, handler) {
  if (handler) {
    return arr.map((el) => (
      <li key={el.name}>
        <input type="checkbox" value={el.name} onChange={(e) => handler(e)} />
        <label for={el.name}>{el.name}</label>
      </li>
    ));
  }
  return arr.map((el) => (
    <option key={el.id} value={el.name}>
      {el.name}
    </option>
  ));
}

export function filterByTemp(arr, defaultArr, temp) {
  if (temp === "All") {
    return defaultArr;
  }

  return arr?.filter((d) => d.temperament?.includes(temp));
}

export function filterBySource(arr, defaultArr, source) {
  if (source === "All") {
    return defaultArr;
  }

  return arr.filter((d) => typeof d.id === source); //if the id is a string, it'll return the dogs from the database, if it's a number it'll return the dogs from the api
}

export function init({
  dispatch,
  dogs,
  query,
  temperaments,
  userData,
  userReducer,
  favorites,
}) {
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

  if (dogs.length !== 0 && userReducer.favorites && favorites.length === 0) {
    const payload = [userReducer, dogs];
    dispatch(getFavorites(payload));
  }
}

export function RenderDog(array, route) {
  const favorites = useSelector((state) => state.favorites);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const { user } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className={styles.card}>
      {array?.map((dog) => {
        return (
          <div className={styles.container} key={dog?.id}>
            <li className={styles.element}>
              {typeof dog?.id === "string" && (
                <button
                  className={styles.delete}
                  onClick={() => dispatch(deleteDog(dog.name))}
                >
                  <MdDelete />
                </button>
              )}
              {user && <FavButtons dog={dog} favorites={favorites} />}
              <Link
                to={`/${route}/${encodeURIComponent(dog?.name).replace(
                  /%20/g,
                  "-"
                )}`} //format the space separation to URI (%20) and replace it with a hypen https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
              >
                <img
                  className={styles.image}
                  onError={(e) => (e.target.src = img)}
                  src={dog?.image}
                  alt={dog?.name}
                />
                <h2 className={styles.name}>{dog?.name}</h2>
                <p className={styles.weight}>{dog?.weight} Kg</p>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  Temperaments:
                </h3>
                <p className={styles.temperament}>
                  {dog?.temperament?.join(" | ")}
                </p>
              </Link>
            </li>
          </div>
        );
      })}
    </ul>
  );
}
export function resetFilters(setOrder, setTemp, setSource) {
  setOrder("a-z");
  setTemp("All");
  setSource("All");
}
