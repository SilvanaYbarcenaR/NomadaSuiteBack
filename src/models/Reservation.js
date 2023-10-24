const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  idAccommodation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Accommodation' }, 
  totalPrice: Number,
  monthsReserved: Number, // De 1 a 12
  entryDate: Date,
  departureDate: Date,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
