const Reservation = require('../../models/Reservation');

const handlePaymentSuccess = async (req, res) => {
    try {
        const { reservationDetails } = req.body;

        const conflictExists = await Reservation.exists({
            idAccommodation: reservationDetails.accommodationId,
            $or: [
                {
                    startDate: { $lte: reservationDetails.endDate },
                    endDate: { $gte: reservationDetails.startDate }
                },
                {
                    startDate: { $gte: reservationDetails.startDate },
                    endDate: { $lte: reservationDetails.endDate }
                }
            ]
        });

        if (conflictExists) {
            return res.status(400).json({ message: 'Las fechas seleccionadas no están disponibles' });
        }

        const startDate = new Date(reservationDetails.startDate);
        const endDate = new Date(reservationDetails.endDate);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (diffDays < 30) {
            return res.status(400).json({ message: 'La duración de la reserva debe ser de al menos 30 días' });
        }

        const newReservation = new Reservation({
            userId: reservationDetails.userId,
            idAccommodation: reservationDetails.accommodationId,
            monthlyRate: reservationDetails.monthlyRate,
            daysReserved: reservationDetails.daysReserved,
            startDate: reservationDetails.startDate, 
            endDate: reservationDetails.endDate  
        });

        await newReservation.save();

        return res.json({ message: 'Reserva guardada exitosamente en la base de datos' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al guardar la reserva en la base de datos', error: error.message });
    }
};

module.exports = handlePaymentSuccess;
