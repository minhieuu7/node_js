const express = require('express');
const {signUp} = require('../controller/user');
const authRouter = express.Router();


authRouter.post('/signup', signUp);

module.exports = authRouter;