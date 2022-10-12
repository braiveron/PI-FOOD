const { Router } = require("express");

const router = Router();
const { Recipe, Type } = require("../../db");
const { getRecipe, getByID, createRecipe } = require("./Middleware");

router.get("/", getRecipe);

router.get("/:id", getByID);

router.post("/", createRecipe);

module.exports = router;
