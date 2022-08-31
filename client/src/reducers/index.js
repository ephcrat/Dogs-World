import {
  GET_DOGS,
  GET_DOG_DETAILS,
  GET_TEMPERAMENTS,
  CREATE_DOG,
  LOADING,
  GET_DOGS_BY_TEMP,
  GET_USER,
  GET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITES,
  SET_CURRENT_PAGE,
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
  user: [],
  users: [],
  favorites: [],
  isLoading: false,
  currentPage: 1,
  dogsPerPage: 8,
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
    case GET_USER:
      return {
        ...state,
        user: payload,
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: payload,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: state?.favorites.concat(payload),
      };
    case REMOVE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((d) => d?.name !== payload.name),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
}
