const express = require('express');
const userPokemonRouter = express.Router();

const userPokemonController = require("../controllers/userPokemonControllers");

userPokemonRouter.get('/mypokemons/:userId', userPokemonController.userPokemonList);

module.exports = userPokemonRouter;