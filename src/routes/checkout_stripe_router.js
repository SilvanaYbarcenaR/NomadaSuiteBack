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
      const reservationDetails = JSON.parse(metadata.reservationDetails);
      const checkoutId = checkoutSession.id;

      // Asignar directamente el fee al objeto billingInfoData
      const billingInfoData = {
        event_id: event.id,
        created: new Date(event.created * 1000),
        checkout_session: {
          id: checkoutSession.id,
          amount_subtotal: checkoutSession.amount_subtotal,
          amount_total: checkoutSession.amount_total,
          currency: checkoutSession.currency,
          customer_details: checkoutSession.customer_details,
          payment_status: checkoutSession.payment_status,
          total_details: checkoutSession.total_details,
          payment_method_types: checkoutSession.payment_method_types,
          fee: Math.round(checkoutSession.amount_total * 0.2), // Calcula y asigna el fee
        },
        livemode: event.livemode,
        type: event.type,
      };

      const result = await handlePaymentSuccess({
        body: {
          reservationDetails,
          checkoutId,
          billingInfo: billingInfoData,
        },
      }, response);

      return result;
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      return response.status(500).json({ message: 'Error al procesar la reserva', error: error.message });
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
    return response.status(400).json({ message: `Unhandled event type ${event.type}` });
  }

  response.json({ received: true });
});




module.exports = checkoutStripeRouter;