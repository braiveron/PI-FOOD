const axios = require("axios");
const e = require("express");
const { Recipe, Type } = require("../../db");
//${process.env.REACT_APP_API_KEY_3}

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=70f3734ffffc4d439ffe0e091cfc3d5b&number=100&addRecipeInformation=true`
    );
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
        createdInDb: false,
      };
    });

    return apiInfo;
  } catch (error) {
    return "Hubo un error de conexion";
  }
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
  console.log(allInfo.length);
  return allInfo;
};

module.exports = { getApiInfo, getDbInfo, getAllInfo };
