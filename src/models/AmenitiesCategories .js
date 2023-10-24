const mongoose = require('mongoose');

const amenitiesCategoriesSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const AmenitiesCategories = mongoose.model('AmenitiesCategories', amenitiesCategoriesSchema);

module.exports = AmenitiesCategories;
