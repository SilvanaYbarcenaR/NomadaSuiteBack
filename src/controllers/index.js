const getAccommodations = require("./accommodation/get_accommodation");
const getAccommodationById = require("./accommodation/get_accommodations_by_id");
const postAccommodation = require("./accommodation/post_accommodations");
const deleteAccommodation = require("./accommodation/delete_accommodation");
const updateAccommodation = require("./accommodation/update_accommodation");
const getServices = require("./services/get_services");
const registerUser = require("./user/post_user");
const getAllUsers = require("./user/get_users");
const getUserById = require("./user/get_user_by_id");
const updateUser = require("./user/put_user");
const deleteUser = require("./user/delete_user");
const loginUser = require("./user/login_user");
const getAllReviews = require("./reviews/get_reviews");
const createReview = require("./reviews/post_review");
const filteredByBedrooms = require("./filters/filteredByBedrooms");
const getCityInfo = require("./cities/get_cities_and_countries");
module.exports = {
  getAccommodations,
  postAccommodation,
  getAccommodationById,
  deleteAccommodation,
  updateAccommodation,
  getServices,
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  getAllReviews,
  createReview,
  filteredByBedrooms,
  getCityInfo,
};
