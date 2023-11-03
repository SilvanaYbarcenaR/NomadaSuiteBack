const express = require('express');
const checkoutStripeRouter = express.Router();
const createPayment = require('../controllers/checkout/stripe_Checkout');
const bodyParser = require('body-parser');


checkoutStripeRouter.post('/charge', createPayment);

checkoutStripeRouter.use(bodyParser.raw({ type: 'application/json' }));

checkoutStripeRouter.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('Evento:', event);
      res.json({ received: true });
    } catch (err) {
      console.error('Error de webhook:', err);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });


module.exports = checkoutStripeRouter;
