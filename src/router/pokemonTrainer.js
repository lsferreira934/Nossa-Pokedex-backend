const express = require('express');
const userPokemonRouter = express.Router();

const pokemonTrainer = require("../controllers/pokemonTrainer");

const mwJwt = require("../middleware/mwJwt");
const mwAuth = require("../middleware/mwRule");

userPokemonRouter.get('/mypokemons/:userId', [mwJwt.verifyToken], pokemonTrainer.pokemonTrainerList);

module.exports = userPokemonRouter;