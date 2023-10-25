const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;
