const Reservation = require("../../models/Reservation");
const User = require("../../models/User");

const getUserReservations = async (req, res) => {
  const id = req.params.userId;
  try {
    const reservations = await Reservation.find();
    if (!reservations) throw new Error("Reservations not found");
    const userReservations = reservations.filter(
      (reservation) => reservation.userId == id
    );

    if (userReservations.length === 0)
      throw new Error("User without reservations");

    res.json(userReservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getUserReservations;
