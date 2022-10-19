const express = require('express');
const userPokemonRouter = express.Router();

const userPokemonController = require("../controllers/userPokemonControllers");

const mwJwt = require("../middleware/mwJwt");
const mwAuth = require("../middleware/mwRule");

userPokemonRouter.get('/mypokemons/:userId', [mwJwt.verifyToken, mwAuth.isAdmin], userPokemonController.userPokemonList);

module.exports = userPokemonRouter;