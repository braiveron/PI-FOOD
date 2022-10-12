const axios = require("axios");
const e = require("express");
const { Recipe, Type } = require("../../db");
const API_KEY = "db880ed1bcd442e3be4183ee279de938";

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
  );
  //console.log(apiUrl);
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      image: e.image,
      typeDiets: e.diets.map((d) => {
        return d;
      }),
      healthScore: e.healthScore,
      dishTypes: e.dishTypes.map((d) => {
        return d;
      }),
      summary: e.summary,
      analyzedInstructions: e.analyzedInstructions,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      trough: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = { getApiInfo, getDbInfo, getAllInfo };
