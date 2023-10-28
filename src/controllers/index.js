const getAccommodations = require("./accommodation/get_accommodation");
const getAccommodationById = require("./accommodation/get_accommodations_by_id");
const postAccommodation = require("./accommodation/post_accommodations");
const deleteAccommodation = require("./accommodation/delete_accommodation");
const updateAccommodation = require("./accommodation/update_accommodation");
const getServices = require('./services/get_services');
const getLocation = require('./location/get_location')
const registerUser = require('./user/post_user');
const getAllUsers = require('./user/get_users');
const getUserById = require('./user/get_user_by_id');
const updateUser = require('./user/put_user');
const deleteUser = require('./user/delete_user');
const filterLocation = require('./filters/filter_location');
const loginUser = require('./user/login_user');
const getAllReviews = require('./reviews/get_reviews');
const createReview = require('./reviews/post_review');


module.exports = {
  getAccommodations,
  postAccommodation,
  getAccommodationById,
  deleteAccommodation,
  updateAccommodation,
  getServices,
  getLocation,
  registerUser,
  getAllUsers, 
  getUserById,
  updateUser,
  deleteUser,
  filterLocation,
  loginUser,
  getAllReviews,
  createReview,
  
};
