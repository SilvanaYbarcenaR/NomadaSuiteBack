const mongoose = require('mongoose');

const locationAccommodationSchema = new mongoose.Schema({
  idAccommodation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Accommodation' }, 
  city: String,
  country: String,
  zipCode: String,
  address: String,
});

const LocationAccommodation = mongoose.model('LocationAccommodation', locationAccommodationSchema);

module.exports = LocationAccommodation;
