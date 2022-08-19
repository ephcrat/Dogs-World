import axios from "axios";
export const CREATE_DOG = "CREATE DOG";
export const GET_TEMPERAMENTS = "GET TEMPERAMENTS";
export const GET_DOGS = "GET DOGS";
export const GET_DOG_DETAILS = "GET DOG DETAILS";
export const LOADING = "LOADING";
export const POST_DOG = "POST DOG";
export const GET_DOGS_ALPHABETICALLY = "GET DOGS ALPHABETICALLY";
export const GET_DOGS_BY_WEIGHT = "GET DOGS BY WEIGHT";
export const GET_DOGS_BY_TEMP = "GET_DOGS_BY_TEMP";
export function getDogs(name) {
  return async function (dispatch) {
    try {
      // if (name) {
      //   const response = await axios.get(`/dogs?name=${name}`);
      //   dispatch({ type: GET_DOGS, payload: response.data });
      // }
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
