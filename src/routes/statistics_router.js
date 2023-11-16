const express = require("express");
const statisticsRouter = express.Router();
const {
    getMonthlyBookingStats,
    getUsersStatistics,
    getRatingStatistics
} = require("../controllers/index");


statisticsRouter.get("/reservation/month", getMonthlyBookingStats);

statisticsRouter.get("/user/actives", getUsersStatistics);
statisticsRouter.get("/reviews", getRatingStatistics);

module.exports =  statisticsRouter 
