const getAccommodations = require('./accommodation/get_accommodation')
const postAccommodation = require('./accommodation/post_accommodations')
const getAccommodationById = require('./accommodation/get_accommodations_by_id')
const getServices = require('./services/get_services');


module.exports = {
 getAccommodations,
 postAccommodation,
 getAccommodationById,
 getServices
}