const express = require("express");
const authRouter = require("./auth");
const pokemonTrainer = require("./pokemonTrainer");

const catchRouter = require("./catch");
const pokemonRouter = require("./pokemon");
const userRouter = require("./user");

const router = express.Router();

const url = '/-/v1'

router.use(url, [
    authRouter,
    catchRouter,
    pokemonRouter,
    pokemonTrainer,
    userRouter
]);


module.exports = router;