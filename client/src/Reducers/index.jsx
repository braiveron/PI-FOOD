import {
  GET_RECIPES,
  GET_TYPES,
  FILTER_TYPES,
  FILTER_SOCRE,
  FILTER_CREATED,
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
    case FILTER_CREATED:
      const allRecipes2 = state.allRecipes;
      const createdFilter =
        action.payload === "db"
          ? allRecipes2.filter((r) => r.createdInDb)
          : allRecipes2.filter((r) => !r.createdInDb);
      return {
        ...state,
        recipes: action.payload === "All" ? state.allRecipes : createdFilter,
      };
    default:
      return state;
  }
}

export default rootReducer;
