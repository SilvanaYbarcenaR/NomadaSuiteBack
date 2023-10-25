const Services = require('../../models/Services');

const getServices = async (req, res) => {

    try {

        const allServices = await Services.find()

        res.json(allServices);

    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

module.exports = getServices;