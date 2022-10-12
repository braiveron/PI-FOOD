const { Router } = require("express");
const router = Router();
const { Recipe, Type } = require("../../db");
const { getDiets } = require("./Middleware");

router.get("/", getDiets);

module.exports = router;
