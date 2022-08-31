const express = require('express');
const userRouter = express.Router();

const userController = require("../controllers/userControllers");

const mwJwt = require("../middlewers/mwJwt");
const mwAuth = require("../middlewers/mwRule");

userRouter.get('/users', [mwJwt.verifyToken, mwAuth.isAdmin], userController.listUsers);
userRouter.post('/user', userController.createUser);
userRouter.get('/user/:id', userController.getUser);
userRouter.put('/user/:id', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);

module.exports = userRouter;