require('dotenv').config();
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
  try {
    const { line_items, duration } = req.body;
    const durationOfStay = duration;

    const baseUrl = process.env.APP_BASE_URL;

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: baseUrl + 'api/stripe/sucess', 
      cancel_url: baseUrl + 'api/stripe/cancel', 
    });

    console.log(session);
    console.log(durationOfStay)
    return res.json({ id: session.id, url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = createPayment;

