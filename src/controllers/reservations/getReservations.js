const Reservation = require("../../models/Reservation");
const BillingInfo = require("../../models/BillingInfo");

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    if (!reservations || reservations.length === 0) {
      throw new Error("Reservations not found");
    }

    const checkoutIds = reservations.map((reservation) => reservation.checkoutId);

    const billingInfo = await BillingInfo.find({ 'checkout_session.id': { $in: checkoutIds } });

    const reservationsWithBillingInfo = reservations.map((reservation) => {
      const matchingBillingInfo = billingInfo.find((info) => info.checkout_session.id === reservation.checkoutId);
      return {
        reservation,
        billingInfo: matchingBillingInfo,
      };
    });

    res.json(reservationsWithBillingInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getReservations;
