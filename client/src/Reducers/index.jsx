import {
  GET_RECIPES,
  GET_TYPES,
  FILTER_TYPES,
  FILTER_SOCRE,
  ORDER_BY_NAME,
  GET_NAME_RECIPES,
  POST_RECIPE,
  GET_DETAILS,
} from "../Actions/const.jsx";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_TYPES:
      const allDiets = state.allRecipes;
      const typeDiets =
        action.payload === "All"
          ? allDiets
          : allDiets.filter((d) =>
              d.typeDiets.find((e) => e === action.payload)
            );
      return {
        ...state,
        recipes: typeDiets,
      };
    case FILTER_SOCRE:
      const allRecipes = state.allRecipes;
      const scoreFilter =
        action.payload === "asc"
          ? allRecipes.sort((a, b) => a.healthScore - b.healthScore)
          : allRecipes.sort((a, b) => b.healthScore - a.healthScore);
      return {
        ...state,
        recipes: scoreFilter,
      };

    case ORDER_BY_NAME:
      const sortedArr =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              } else if (a.title < b.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title < b.title) {
                return 1;
              } else if (a.title > b.title) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };
    case GET_NAME_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
