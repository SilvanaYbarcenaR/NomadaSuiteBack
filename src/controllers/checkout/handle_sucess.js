const BillingInfo = require('../../models/BillingInfo');
const Reservation = require('../../models/Reservation');

const saveBillingInfo = async (req) => {
  try {
      const billingInfoData = req.billingInfo;

      billingInfoData.fee = Math.round(billingInfoData.checkout_session.amount_total * 0.2);

      return await BillingInfo.create(billingInfoData);
  } catch (error) {
      console.error('Error al guardar la información de facturación:', error);
      throw new Error('Error al guardar la información de facturación en la base de datos');
  }
};

  
  
const handlePaymentSuccess = async (req, res) => {
    try {
        const { reservationDetails, checkoutId, billingInfo } = req.body;

        const billingInfoData = billingInfo || {}; 

        const savedBillingInfo = await saveBillingInfo({ billingInfo: billingInfoData });
    
        const conflictExists = await Reservation.exists({
          idAccommodation: reservationDetails.accommodationId,
          $or: [
            {
              startDate: { $lte: reservationDetails.endDate },
              endDate: { $gte: reservationDetails.startDate },
            },
            {
              startDate: { $gte: reservationDetails.startDate },
              endDate: { $lte: reservationDetails.endDate },
            },
          ],
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
          endDate: reservationDetails.endDate,
          totalPrice: reservationDetails.totalPrice,
          checkoutId: checkoutId,
        });
    
        await newReservation.save();
    
        return res.json({ message: 'Reserva y facturación guardadas exitosamente en la base de datos' });
      } catch (error) {
        console.error('Error al manejar el éxito del pago:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
      }
    };


module.exports = handlePaymentSuccess;
