const stripe = require('stripe')('sk_test_51O7j6AB5JkK26D9XNZkbUpZqEY6VlSep1gISiXFc0IUyPiHKrAHLv5R0cHeVIXtnTbhhhAToD0o1JK1RPPA8jJf100y5twZqAq'); 
const express = require('express');
const createPayment = require('../controllers/checkout/stripe_Checkout');
require('dotenv').config();

const checkoutStripeRouter = express.Router();


checkoutStripeRouter.post('/charge', createPayment);

checkoutStripeRouter.use(express.json());

checkoutStripeRouter.post('/webhook', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const event = req.body;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  const eventData = req.body;


  const isSignatureValid = stripe.webhooks.verifySignatureV2(
    eventData,
    signature,
    secret
  );

  if (!isSignatureValid) {
    res.status(400).send('Error de firma de webhook');
    return;
  }
  const eventHandler = webhookHandlers[eventData.type];
  if (eventHandler) {
    await eventHandler(eventData);
  } else {
    res.status(404).send('Evento de webhook no reconocido');
    return;
  }

  res.status(200).send();
});

module.exports = checkoutStripeRouter;