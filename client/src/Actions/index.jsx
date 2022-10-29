import axios from "axios";
import {
  URL_RECIPES,
  URL_RECIPES_QUERY,
  URL_TYPES,
  GET_RECIPES,
  GET_TYPES,
  FILTER_TYPES,
  FILTER_SOCRE,
  ORDER_BY_NAME,
  GET_NAME_RECIPES,
  CLEAR_DETAILS,
  GET_DETAILS,
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
      let typeDiets = await axios.get(URL_TYPES);
      return dispatch({
        type: GET_TYPES,
        payload: typeDiets.data,
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

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function getNameRecipes(title) {
  return async function (dispatch) {
    try {
      const recipes = await axios.get(URL_RECIPES_QUERY + title);
      return dispatch({
        type: GET_NAME_RECIPES,
        payload: recipes.data,
      });
    } catch (error) {
      alert("No existe receta con ese nombre");
    }
  };
}

export function postRecipe(payload) {
  console.log(payload);
  return async (dispatch) => {
    try {
      const response = await axios.post(URL_RECIPES, payload);
      return {
        response,
      };
    } catch (error) {
      return error;
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL_RECIPES + id);
      return dispatch({
        type: GET_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function clearDetails() {
  return {
    type: CLEAR_DETAILS,
  };
}
