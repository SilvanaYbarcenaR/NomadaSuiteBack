const stripe = require('stripe')('sk_test_51O7j6AB5JkK26D9XNZkbUpZqEY6VlSep1gISiXFc0IUyPiHKrAHLv5R0cHeVIXtnTbhhhAToD0o1JK1RPPA8jJf100y5twZqAq'); 
const express = require('express');
const createPayment = require('../controllers/checkout/stripe_Checkout');
const handlePaymentSuccess = require("../controllers/checkout/handle_sucess");
require('dotenv').config();

const checkoutStripeRouter = express.Router();


checkoutStripeRouter.post('/charge', createPayment);

checkoutStripeRouter.use(express.json());

checkoutStripeRouter.post('/webhook', express.json({ type: 'application/json' }), (request, response) => {
  const event = request.body;

  console.log('Información del evento recibido:');
  console.log(event);

  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object;
    console.log('Checkout Session ID:', checkoutSession.id);
    const metadata = checkoutSession.metadata;
    console.log('Metadata:', metadata);

    if (metadata && metadata.reservationDetails) {
      const reservationDetails = JSON.parse(metadata.reservationDetails);
      
  
      handlePaymentSuccessFromWebhook(reservationDetails);
      
      response.json({ received: true });
    } else {
      console.log('No se encontraron detalles de reserva en la metadata');
      response.status(400).json({ error: 'No se encontraron detalles de reserva en la metadata' });
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
    response.status(400).json({ error: 'Evento no manejado' });
  }
});

const handlePaymentSuccessFromWebhook = async (reservationDetails) => {
  try {
    const result = await handlePaymentSuccess({
      body: {
        reservationDetails 
      }
    }, {
      json: (data) => console.log(data),
      status: (code) => console.log(`Status code: ${code}`)
    });

    console.log('Resultado de handlePaymentSuccess:', result);
  } catch (error) {
    console.error('Error al ejecutar handlePaymentSuccess:', error);
  }
};


module.exports = checkoutStripeRouter;