const { Recipe, Type } = require("../../db");
const { getAllInfo } = require("./Functions");

const getRecipe = async (req, res, next) => {
  try {
    const { name } = req.query;
    const recipesTotal = await getAllInfo();
    if (name) {
      let recipeTitle = await recipesTotal.filter((r) =>
        r.title.toLowerCase().includes(name.toLowerCase())
      );
      recipeTitle.length
        ? res.status(200).json(recipeTitle)
        : res.status(400).send("This recipe doesn't exist");
    } else {
      res.status(200).json(recipesTotal);
    }
  } catch (error) {
    next(error);
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
  try {
    const {
      title,
      summary,
      healtScore,
      analyzedInstructions,
      image,
      diets,
      createdInDb,
    } = req.body;

    if (!title || !summary) {
      return res
        .status(404)
        .json("Debes ingresar un NOMBRE y un RESUMEN para crear tu receta");
    }
    const newRecipe = await Recipe.create({
      title,
      summary,
      healtScore,
      analyzedInstructions,
      image,
      createdInDb,
    });
    const dietDB = await Type.findAll({
      where: {
        name: diets,
      },
    });
    await newRecipe.addType(dietDB);
    res.json("Receta creada con exito");
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecipe, getByID, createRecipe };
