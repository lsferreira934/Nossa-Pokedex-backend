const express = require('express');
const catchRouter = express.Router();

const catchPokemonController = require("../controllers/catchPokemonControllers");

catchRouter.post('/catch/:userId', catchPokemonController.catchPokemon);

module.exports = catchRouter;