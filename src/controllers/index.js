const getAccommodations = require("./accommodation/get_accommodation");
const postAccommodation = require("./accommodation/post_accommodations");
const getServices = require("./services/get_services");
const deleteAccommodation = require("./accommodation/delete_accommodation");
const updateAccommodation = require("./accommodation/update_accommodation");

module.exports = {
  getAccommodations,
  postAccommodation,
  getServices,
  deleteAccommodation,
  updateAccommodation,
};
