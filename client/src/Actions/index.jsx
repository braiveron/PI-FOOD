import axios from "axios";
import {
  URL_RECIPES,
  URL_TYPES,
  GET_RECIPES,
  GET_TYPES,
  FILTER_TYPES,
  FILTER_SOCRE,
  FILTER_CREATED,
} from "./const";

export function getRecipes() {
  return async function (dispatch) {
    try {
      let recipes = await axios.get(URL_RECIPES);
      return dispatch({
        type: GET_RECIPES,
        payload: recipes.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      let types = await axios.get(URL_TYPES);
      return dispatch({
        type: GET_TYPES,
        payload: types.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function filterByType(payload) {
  return {
    type: FILTER_TYPES,
    payload,
  };
}

export function filterByScore(payload) {
  console.log(payload);
  return {
    type: FILTER_SOCRE,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}
