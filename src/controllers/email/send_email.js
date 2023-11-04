const sgMail = require('../../services/sendgrid')

const sendEmail = async (req, res) => {

    const { to, subject, text, html, sandboxMode = false } = req.body;

    const msg = {
        to,
        from: 'nomadasuite@gmail.com',
        subject,
        text,
        html,
        mail_settings: {
            sandbox_mode: {
                enable: sandboxMode
            }
        }
    };

    try {

        if (!to) {
            return res.status(404).json({message: 'Invalid credentials'});
        }

        await sgMail.send(msg);

        res.status(200).json({success: true});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = sendEmail;