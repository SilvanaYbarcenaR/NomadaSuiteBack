const stripe = require('stripe')('sk_test_51O7j6AB5JkK26D9XNZkbUpZqEY6VlSep1gISiXFc0IUyPiHKrAHLv5R0cHeVIXtnTbhhhAToD0o1JK1RPPA8jJf100y5twZqAq'); 
const express = require('express');
const createPayment = require('../controllers/checkout/stripe_Checkout');
require('dotenv').config();

const checkoutStripeRouter = express.Router();


checkoutStripeRouter.post('/charge', createPayment);

checkoutStripeRouter.use(express.json());

checkoutStripeRouter.post('/webhook', express.json({ type: 'application/json' }), (request, response) => {
  const event = request.body;

  // Log the event information
  console.log('Información del evento recibido:');
  console.log(event);

  // Handle the event if it's a checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Access the metadata
    const metadata = session.metadata;
    console.log('Metadata:', metadata);
    // Aquí puedes utilizar los metadatos para realizar acciones en tu aplicación
  }
  // Respond to acknowledge receipt of the event
  response.json({ received: true });
});



module.exports = checkoutStripeRouter;