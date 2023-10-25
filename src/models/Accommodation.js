const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  name: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  idServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Services'
    }
  ],
  photos: [String],
  idLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LocationAccommodation'
  },
  description: String,
  price: Number,
  isActive: Boolean,
  idReserve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation'
  },
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
