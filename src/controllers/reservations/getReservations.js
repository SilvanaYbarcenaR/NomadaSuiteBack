const Reservation = require("../../models/Reservation");

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    if (!reservations) throw new Error("Reservations not found");

    res.json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getReservations;
