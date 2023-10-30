const LocationAccommodation = require('../../models/LocationAccommodation');
const Accommodation = require("../../models/Accommodation");

const filterLocation = async (req, res) => {
    
    const { country, city } = req.body;

    try {

        let query = {};

        if (country) {
            query.country = {
                $regex: new RegExp(country, 'i')
            };
        }

        if (city) {
            query.city = {
                $regex: new RegExp(city, 'i')
            };
        }

        const locations = await LocationAccommodation.find(query);

        res.json(locations);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = filterLocation;