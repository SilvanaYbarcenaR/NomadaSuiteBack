const express = require('express');
const checkoutStripeRouter = express.Router();
const createPayment = require('../controllers/checkout/stripe_Checkout');
const stripe = require('stripe')('tu_clave_secreta_de_stripe');
const endpointSecret = 'whsec_eomcE63VObcPAbcxPM5loK8Jpb8LtVdU'; // Tu secreto de firma de Stripe

checkoutStripeRouter.post('/charge', createPayment);

checkoutStripeRouter.post('/webhook', (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Manejar el evento recibido desde Stripe
    switch (event.type) {
        case 'checkout.session.completed':
            // Acciones a realizar cuando se completa exitosamente el pago
            // Por ejemplo, activar la creación de una reserva
            // createReservation(event.data.object); // Suponiendo una función 'createReservation'
            break;
        default:
            // Manejar otros tipos de eventos de Stripe si es necesario
            console.log(`Evento no manejado: ${event.type}`);
    }

    res.json({ received: true });
});

module.exports = checkoutStripeRouter;
