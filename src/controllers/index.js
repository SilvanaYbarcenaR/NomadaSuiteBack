const getAccommodations = require("./accommodation/get_accommodation");
const getAllAccommodations = require("./accommodation/get_all_accommodation");
const getAllAccommodationsByUser = require("./accommodation/get_all_accommodation_by_userId");
const getDesactiveAccommodations = require("./accommodation/get_desactive_accommodation");
const getPendingAccommodations = require("./accommodation/get_pending_accommodation");
const getAccommodationById = require("./accommodation/get_accommodations_by_id");
const postAccommodation = require("./accommodation/post_accommodations");
const deleteAccommodation = require("./accommodation/delete_accommodation");
const updateAccommodation = require("./accommodation/update_accommodation");
const getServices = require("./services/get_services");
const getLocation = require("./location/get_location");
const registerUser = require("./user/post_user");
const getAllUsers = require("./user/get_users");
const getUserById = require("./user/get_user_by_id");
const updateUser = require("./user/put_user");
const deleteUser = require("./user/delete_user");
const filterLocation = require("./filters/filter_location");
const filteredByBedrooms = require("./filters/filteredByBedrooms");
const loginUser = require("./user/login_user");
const getAllReviews = require("./reviews/get_reviews");
const getDesactiveReviews = require("./reviews/get_desactive_review");
const getPendingReviews = require("./reviews/get_pending_review");
const createReview = require("./reviews/post_review");
const deleteReview = require("./reviews/delete_review");
const updateReview = require("./reviews/update_review");
const getAllReviewsByAccommodationId = require("./reviews/get_review_by_acommodation");
const combinatedFilter = require("./filters/combinated_filter");
const filteredByServices = require("./filters/filteredByServices");
const sendEmail = require("./email/send_email");
// const mercadoPagoController = require("./checkout/mercadoPago_checkout");
const createPayment = require("./checkout/stripe_Checkout");
const getUsersActives = require("./user/get_users_actives");
const getReservations = require("./reservations/getReservations");
const getReservationByCheckoutId = require("./reservations/get_reservation_checkoutId");
const getUserReservations = require("./reservations/getUserReservations");
const getUsersActivesFalse = require("./user/get_users_actives_false");
const getMonthlyBookingStats = require("./statistics/reservation_statistics");

module.exports = {
  getAccommodations,
  getAllAccommodations,
  getDesactiveAccommodations,
  getPendingAccommodations,
  getAllAccommodationsByUser,
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
  loginUser,
  createReview,
  deleteReview,
  updateReview,
  getAllReviewsByAccommodationId,
  filterLocation,
  getAllReviews,
  filteredByBedrooms,
  combinatedFilter,
  filteredByServices,
  sendEmail,
  createPayment,
  getUsersActives,
  getReservations,
  getUserReservations,
  getUsersActivesFalse,
  getReservationByCheckoutId,
  getDesactiveReviews,
  getPendingReviews,
  getMonthlyBookingStats
};
