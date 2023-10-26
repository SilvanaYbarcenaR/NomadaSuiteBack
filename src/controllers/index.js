const getAccommodations = require('./accommodation/get_accommodation')
const postAccommodation = require('./accommodation/post_accommodations')
const getServices = require('./services/get_services');


module.exports = {
  getAccommodations,
  postAccommodation,
  getAccommodationById,
 getServices,
  deleteAccommodation,
  updateAccommodation,
};
