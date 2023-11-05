const stripe = require('stripe')('sk_test_...'); // Tu clave secreta de Stripe
const express = require('express');
const createPayment = require('../controllers/checkout/stripe_Checkout');
require('dotenv').config();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const checkoutStripeRouter = express.Router();

console.log('endpointSecret', endpointSecret);

checkoutStripeRouter.post('/charge', createPayment);

checkoutStripeRouter.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      console.log('Evento:', event);
      res.json({ received: true });
    } catch (err) {
      console.error('Error de webhook:', err);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });
});

module.exports = checkoutStripeRouter;
