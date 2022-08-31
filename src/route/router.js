const express = require("express");
const authRouter = require("./auth.router");
const catchRouter = require("./catch.router");
const pokemonRouter = require("./pokemon.router");
const userPokemonRouter = require("./userPokemon.router");
const userRouter = require("./user.router");

const router = express.Router();


router.use('/-/v1', authRouter);
router.use('/-/v1', catchRouter);
router.use('/-/v1', pokemonRouter);
router.use('/-/v1', userPokemonRouter);
router.use('/-/v1', userRouter);

module.exports = router;