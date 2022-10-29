const { Recipe, Type } = require("../../db");
const { getAllInfo } = require("./Functions");

const getRecipe = async (req, res, next) => {
  const { name } = req.query;
  const recipesTotal = await getAllInfo();
  if (name) {
    try {
      let recipeTitle = await recipesTotal.filter((r) =>
        r.title.toLowerCase().includes(name.toLowerCase())
      );
      recipeTitle.length
        ? res.status(200).json(recipeTitle)
        : res.status(400).send("No existe una receta con ese nombre");
    } catch (error) {
      next(error);
    }
  } else {
    try {
      res.status(200).json(recipesTotal);
    } catch (error) {
      next(error);
    }
  }
};

const getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipesTotal = await getAllInfo();
    if (id) {
      let recipeId = await recipesTotal.filter((e) => e.id == id);
      recipeId.length
        ? res.json(recipeId)
        : res.status(404).send("No se encontro receta para este ID");
    }
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  const {
    title,
    summary,
    healthScore,
    analyzedInstructions,
    image,
    typeDiets,
    createdInDb,
  } = req.body;
  console.log(typeof healthScore);
  if (!title || !summary) {
    return res
      .status(404)
      .json("Debes ingresar un NOMBRE y un RESUMEN para crear tu receta");
  }
  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      analyzedInstructions,
      image,
      createdInDb,
    });
    const dietDB = await Type.findAll({
      where: {
        name: typeDiets,
      },
    });
    newRecipe.addType(dietDB);
    res.json("Receta creada con exito");
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecipe, getByID, createRecipe };
