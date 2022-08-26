import axios from "axios";
export const CREATE_DOG = "CREATE DOG";
export const GET_TEMPERAMENTS = "GET TEMPERAMENTS";
export const GET_DOGS = "GET DOGS";
export const GET_DOG_DETAILS = "GET DOG DETAILS";
export const LOADING = "LOADING";
export const POST_DOG = "POST DOG";
export const GET_DOGS_BY_TEMP = "GET DOGS BY TEMP";
export const GET_USER = "GET USER";
export const GET_FAVORITES = "GET FAVORITES";
export const ADD_FAVORITE = "ADD FAVORITE";
export const REMOVE_FAVORITES = "REMOVE FAVORITES";
export function getDogs(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/dogs${name ? `?name=${name}` : `/`}`);
      dispatch({ type: GET_DOGS, payload: response.data });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function getDogDetails(payload) {
  return async function (dispatch) {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.get(`/dogs/${payload}`);
      dispatch({ type: GET_DOG_DETAILS, payload: response.data });
      dispatch({ type: LOADING, payload: false });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    try {
      const data = {
        name: payload.name,
        image: payload.image,
        temperament: payload.temperament,
        min_height: payload.min_height,
        max_height: payload.max_height,
        min_weight: payload.min_weight,
        max_weight: payload.max_weight,
        min_life_span: payload.min_life_span,
        max_life_span: payload.max_life_span,
      };
      const post = await axios.post("/dogs", data);
      dispatch({ type: POST_DOG, payload: post.data });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/temperaments/");
      dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function getUser(payload) {
  return async function (dispatch) {
    try {
      const data = {
        id: payload.id,
        name: payload.name,
      };
      const response = await axios.post("/user", data); //get the user data or create one in the db if not exists

      dispatch({ type: GET_USER, payload: response.data[0] });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function getFavorites(payload) {
  //payload is an array, on position 0 it'll have the dog ids(names) and on position 1 it'll have the dogs array from the global state
  return async function (dispatch) {
    try {
      console.log(payload);
      const arr = [];
      const formatedFavs = payload[0].favorites.split("|");
      const allDogs = payload[1];
      formatedFavs.forEach((d) => {
        //if the user has favorites associated with it's account, find each favorite by id(name), push them into an empty array and dispatch the array to the favorites global state
        const findDog = allDogs.find((dog) => d === dog.name);
        arr.push(findDog);
      });
      dispatch({
        type: GET_FAVORITES,
        payload: arr,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function addFavorite(payload) {
  //payload is an array, on position 0 it'll have the dog details and on position 1 it'll have the userId
  return async function (dispatch) {
    try {
      await axios.put("/user", { id: payload[1], dogName: payload[0].name });
      dispatch({
        type: ADD_FAVORITE,
        payload: payload[0],
      });
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function removeFavorite(payload) {
  return async function (dispatch) {
    await axios.put("/user", {
      id: payload[1],
      dogName: payload[0].name,
      del: true, //it's the same put route used on addFavorite but with the parameter del on true, instead of updating the favorites string in the db to add a dogName, it'll remove the dogName from the string
    });
    dispatch({
      type: REMOVE_FAVORITES,
      payload: payload[0],
    });
    try {
    } catch (err) {
      console.error(err.message);
    }
  };
}
