const axios = require("axios");

const { Type } = require("../../db");
//${process.env.REACT_APP_API_KEY_3}

const getDiets = async (req, res, next) => {
  try {
    const recipesApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=648dec16c2ea43879e15b90c3a7f9fec&addRecipeInformation=true&number=100`
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
  } catch (error) {
    next(error);
  }
};

module.exports = { getDiets };
