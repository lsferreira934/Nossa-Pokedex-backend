const express = require('express');
const authRouter = express.Router();

const authController = require("../controllers/authControllers");
const mwCheckDuplicateUser = require("../middleware/mwCheckDuplicateUser");
const mwCheckRolesExisted = require("../middleware/mwCheckRolesExisted");
const mwJwt = require('../middleware/mwJwt')

authRouter.post('/signin', authController.signin)

authRouter.post('/signup', [
    mwCheckDuplicateUser.checkDuplicateUser,
    mwCheckRolesExisted.checkRolesExisted,
],
    authController.signup
);

authRouter.post('/refresh-token', authController.refreshToken)

authRouter.post('/logoff', mwJwt.verifyToken, authController.logoff)

module.exports = authRouter;