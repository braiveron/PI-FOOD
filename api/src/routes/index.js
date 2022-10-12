const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const recipe = require("./Recipes/Recipes");
const types = require("./Types/Diets");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipe);
router.use("/diets", types);

module.exports = router;
