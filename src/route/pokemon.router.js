const express = require('express');
const pokemonRouter = express.Router();

const pokemonController = require("../controllers/pokemonControllers");

pokemonRouter.get('/pokemons', pokemonController.listPokemons);

module.exports = pokemonRouter;