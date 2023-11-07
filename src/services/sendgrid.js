const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENGRID_API_KEY;

sgMail.setApiKey(apiKey);

module.exports = sgMail;