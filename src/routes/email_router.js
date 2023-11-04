const express = require("express");
const emailRouter = express.Router();
const { sendEmail } = require('../controllers/index')

emailRouter.post('/', sendEmail);

module.exports = {emailRouter}