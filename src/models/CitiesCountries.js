const mongoose = require("mongoose");

const citiesAndCountriesSchema = new mongoose.Schema({
  city: String,
  country: String,
});

const CitiesCountries = mongoose.model(
  "CitiesCountries",
  citiesAndCountriesSchema
);

module.exports = CitiesCountries;
