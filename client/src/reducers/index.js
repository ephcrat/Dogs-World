import {
  GET_DOGS,
  GET_DOG_DETAILS,
  GET_TEMPERAMENTS,
  CREATE_DOG,
  LOADING,
  GET_DOGS_BY_TEMP,
} from "../actions";

const initialState = {
  dog: {
    name: "",
    min_weight: 0,
    max_weight: 0,
    min_height: 0,
    max_height: 0,
    min_life_span: 0,
    max_life_span: 0,
    origin: "",
    image: "",
    temperament: "",
  },
  dogs: [],
  temperaments: [],
  dogDetails: {},
  isLoading: false,
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DOGS:
      return { ...state, dogs: payload };
    case GET_DOG_DETAILS:
      return { ...state, dogDetails: payload };
    case CREATE_DOG:
      return { ...state, dog: payload };
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: payload };
    case GET_DOGS_BY_TEMP:
      return {
        ...state,
        dogs: state.dogs.filter((d) => d.temperament?.includes(payload)),
      };
    default:
      return state;
  }
}
