const express = require("express");
const authRouter = require("./auth");
const catchRouter = require("./catch");
const pokemonRouter = require("./pokemon");
const userPokemonRouter = require("./userPokemon");
const userRouter = require("./user");

const router = express.Router();

const url = '/-/v1'

router.use(url, [
    authRouter,
    catchRouter,
    pokemonRouter,
    userPokemonRouter,
    userRouter
]);


module.exports = router;