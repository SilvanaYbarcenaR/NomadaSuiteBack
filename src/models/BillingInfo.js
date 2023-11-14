const mongoose = require('mongoose');

const billingInfoSchema = new mongoose.Schema({
  event_id: String,
  created: Date,
  checkout_session: {
    id: String,
    amount_subtotal: Number,
    amount_total: Number,
    currency: String,
    customer_details: {
      name: String,
      email: String,
      address: {
        country: String,
      },
    },
    payment_status: String,
    total_details: {
      amount_discount: Number,
      amount_shipping: Number,
      amount_tax: Number,
    },
    payment_method_types: [String], 
  },
  livemode: Boolean,
  type: String,
});

const BillingInfo = mongoose.model('BillingInfo', billingInfoSchema);

module.exports = BillingInfo;
