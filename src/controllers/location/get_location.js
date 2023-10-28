const LocationAccommodation = require('../../models/LocationAccommodation')

const getLocation = async (req, res) => {

    try {

        const allLocations = await LocationAccommodation.find();

        return res.json(allLocations);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

module.exports = getLocation;