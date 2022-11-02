const express = require('express');
const catchRouter = express.Router();

const catchPokemonController = require("../controllers/catchPokemonControllers");

const mwJwt = require("../middleware/mwJwt");
const mwAuth = require("../middleware/mwRule");

catchRouter.post('/catch/:userId', [mwJwt.verifyToken, mwAuth.isAdmin], catchPokemonController.catchPokemon);

module.exports = catchRouter;