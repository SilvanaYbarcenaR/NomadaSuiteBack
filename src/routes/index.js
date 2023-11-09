const { Router } = require("express");
const { accommodationRouter } = require('./accommodation_router');
const { servicesRouter } = require('./services_router');
const { locationRouter } = require('./location_router');
const { userRouter } = require('./user_router');
const { filteredRouter } = require('./filtered_router');
const { reviewsRouter } = require('./reviews_router');
const { emailRouter } = require('./email_router');
const checkoutStripeRouter  = require('./checkout_stripe_router');
const reservationRouter = require('./reservation_router');
const tokenRouter = require('./tokens_router');

const router = Router();

router.use('/api/accommodation', accommodationRouter);
router.use('/api/services', servicesRouter);
router.use('/api/location', locationRouter);
router.use('/api/user', userRouter);
router.use('/api/filtered', filteredRouter);
router.use('/api/reviews', reviewsRouter);
router.use('/api/email', emailRouter);
router.use('/api/stripe', checkoutStripeRouter);
router.use('/api/reservation', reservationRouter);
router.use('/api/tokens', tokenRouter);

router.use((req, res, next) => {
  console.log("Ruta no encontrada:", req.originalUrl);
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = router;
