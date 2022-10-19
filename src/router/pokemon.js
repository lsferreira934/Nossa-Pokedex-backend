const express = require('express');
const pokemonRouter = express.Router();

const pokemonController = require("../controllers/pokemonControllers");

const mwJwt = require("../middleware/mwJwt");
const mwAuth = require("../middleware/mwRule");

pokemonRouter.get('/pokemons', [mwJwt.verifyToken, mwAuth.isAdmin],pokemonController.listPokemons);

module.exports = pokemonRouter;