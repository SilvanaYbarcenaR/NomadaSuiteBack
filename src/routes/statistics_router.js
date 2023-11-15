const express = require("express");
const statisticsRouter = express.Router();
const {
    getMonthlyBookingStats,
    getUsersStatistics
} = require("../controllers/index");


statisticsRouter.get("/reservation/month", getMonthlyBookingStats);

statisticsRouter.get("/user/actives", getUsersStatistics);

module.exports =  statisticsRouter 
