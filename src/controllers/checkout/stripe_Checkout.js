const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
    let session; // Declarar la variable fuera del bloque try

    try {
        const { line_items, reservationDetails } = req.body;

        const baseUrl = process.env.APP_BASE_URL;

        const reservationDetailsAsString = JSON.stringify(reservationDetails);

        session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${baseUrl}/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}`,
            metadata: {
                reservationDetails: reservationDetailsAsString 
            }
        });

        return res.json({ id: session.id, url: session.url });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = createPayment;
