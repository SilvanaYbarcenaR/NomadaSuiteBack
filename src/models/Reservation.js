const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  idAccommodation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Accommodation' }, 
  totalPrice: Number,
  daysReserved: Number, //mínimo 30
  entryDate: Date,
  departureDate: Date,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
