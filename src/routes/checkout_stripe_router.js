const stripe = require('stripe')('sk_test_51O7j6AB5JkK26D9XNZkbUpZqEY6VlSep1gISiXFc0IUyPiHKrAHLv5R0cHeVIXtnTbhhhAToD0o1JK1RPPA8jJf100y5twZqAq'); 
const express = require('express');
const createPayment = require('../controllers/checkout/stripe_Checkout');
const handlePaymentSuccess = require("../controllers/checkout/handle_sucess");
require('dotenv').config();

const checkoutStripeRouter = express.Router();


checkoutStripeRouter.post('/charge', createPayment);

checkoutStripeRouter.use(express.json());

checkoutStripeRouter.post('/webhook', express.json({ type: 'application/json' }), async (request, response) => {
  const event = request.body;

  console.log('Información del evento recibido:');
  console.log(event);

  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object;
    console.log('Checkout Session ID:', checkoutSession.id);
    const metadata = checkoutSession.metadata;
    console.log('Metadata:', metadata);

    try {
      // Extrae reservationDetails del metadata y convierte el string JSON a un objeto
      const reservationDetails = JSON.parse(metadata.reservationDetails);

      // Llama al controlador handlePaymentSuccess y pasa los detalles de la reserva
      const result = await handlePaymentSuccess({ body: { reservationDetails } }, response);

      // Devuelve la respuesta del controlador como respuesta al webhook
      return result;
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      return response.status(500).json({ message: 'Error al procesar la reserva' });
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  response.json({ received: true });
});



module.exports = checkoutStripeRouter;