const express = require('express');
const authRouter = express.Router();

const authController = require("../controllers/authControllers");
const mwCheckDuplicateUser = require("../middlewers/mwCheckDuplicateUser");
const mwCheckRolesExisted = require("../middlewers/mwCheckRolesExisted");

authRouter.post('/signin', authController.signin)

authRouter.post('/signup', [
    mwCheckDuplicateUser,
    mwCheckRolesExisted,
],
    authController.signup
);

module.exports = authRouter;