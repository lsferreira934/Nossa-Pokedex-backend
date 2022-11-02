const express = require('express');
const authRouter = express.Router();

const authController = require("../controllers/authControllers");

const mwUser = require("../middleware/mwUser");
const mwJwt = require('../middleware/mwJwt')

authRouter.post('/signin', authController.signin);

authRouter.post('/signup', [
    mwUser.checkDuplicateUser,
    mwUser.checkRolesExisted,
],
    authController.signup
);

authRouter.post('/refresh-token', authController.refreshToken)

authRouter.post('/logoff', mwJwt.verifyToken, authController.logoff)

module.exports = authRouter;