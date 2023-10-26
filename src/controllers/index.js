const getAccommodations = require('./accommodation/get_accommodation')
const getAccommodationById = require('./accommodation/get_accommodations_by_id')
const postAccommodation = require('./accommodation/post_accommodations')
const deleteAccommodation = require("./accommodation/delete_accommodation");
const updateAccommodation = require("./accommodation/update_accommodation");
const getServices = require('./services/get_services');


module.exports = {
  getAccommodations,
  postAccommodation,
  getAccommodationById,
  deleteAccommodation,
  updateAccommodation,
  getServices,
};
