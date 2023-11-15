const express = require("express");
const statisticsRouter = express.Router();
const {
    getMonthlyBookingStats
} = require("../controllers/index");


statisticsRouter.get("/reservation/month", getMonthlyBookingStats);

module.exports =  statisticsRouter 
