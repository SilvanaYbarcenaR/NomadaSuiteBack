const express = require('express');
const tokenRouter = express.Router();
const verifyToken = require('../middlewares/token_middleware')

tokenRouter.post('/', verifyToken, (req, res) => {

    res.json({ message: '¡Token válido! Acceso permitido.' });
  });

module.exports =  tokenRouter; 