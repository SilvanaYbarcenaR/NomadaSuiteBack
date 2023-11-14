const Reservation = require("../models/Reservation");
const express = require("express");
const reservationRouter = express.Router();
const handlePaymentSuccess = require("../controllers/checkout/handle_sucess");
const {
  getReservations,
  getUserReservations,
  getReservationByCheckoutId,
} = require("../controllers/index");

reservationRouter.post("/sucess", handlePaymentSuccess);

reservationRouter.get("/disponibility/:accommodationId", async (req, res) => {
  try {
    const { accommodationId } = req.params;

    const reservations = await Reservation.find({
      idAccommodation: accommodationId,
    });

    const unavailableRanges = [];

    reservations.forEach((reservation) => {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);

      unavailableRanges.push({
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      });
    });

    return res.json({ unavailableRanges });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener la disponibilidad",
      error: error.message,
    });
  }
});

reservationRouter.get("/", getReservations);
reservationRouter.get("/:userId", getUserReservations);
reservationRouter.get("/checkout/:checkoutId", getReservationByCheckoutId);


module.exports = reservationRouter;
