const Reservation = require("../../models/Reservation");


const getReservationByCheckoutId = async (req, res) => {
  try {
    const checkoutId = req.params.checkoutId;

    const reservation = await Reservation.findOne({ checkoutId });

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    return res.json({ reservation });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la reserva', error: error.message });
  }
};

module.exports =  getReservationByCheckoutId 
