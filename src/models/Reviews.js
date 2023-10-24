const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  idUser: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User' }, 
  idAccommodation: { type: mongoose.Schema.Types.ObjectId,
     ref: 'Accommodation' }, 
  comment: String,
  rating: Number,
  isActive: Boolean,
});

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;
