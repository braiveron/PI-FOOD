const axios = require("axios");
const API_KEY = "db880ed1bcd442e3be4183ee279de938";
const { Type } = require("../../db");

const getDiets = async (req, res, next) => {
  const recipesApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const types = await recipesApi.data.results.map((t) => t.diets);
  const diets = types.flat();
  const typeDiets = [...new Set(diets)];
  typeDiets.forEach((d) => {
    Type.findOrCreate({
      where: { name: d },
    });
  });
  const allDiets = await Type.findAll();
  res.json(allDiets);
};

module.exports = { getDiets };