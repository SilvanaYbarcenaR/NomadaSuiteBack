const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const services = mongoose.model('services', servicesSchema);

module.exports = services;
