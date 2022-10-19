const express = require('express');
const userRouter = express.Router();

const userController = require("../controllers/userControllers");

const mwJwt = require("../middleware/mwJwt");
const mwAuth = require("../middleware/mwRule");

userRouter.get('/users', [mwJwt.verifyToken, mwAuth.isAdmin], userController.listUsers);
userRouter.post('/user', [mwJwt.verifyToken, mwAuth.isAdmin], userController.createUser);
userRouter.get('/user/:id', [mwJwt.verifyToken, mwAuth.isAdmin], userController.getUser);
userRouter.put('/user/:id', [mwJwt.verifyToken, mwAuth.isAdmin], userController.updateUser);
userRouter.delete('/user/:id', [mwJwt.verifyToken, mwAuth.isAdmin], userController.deleteUser);

module.exports = userRouter;