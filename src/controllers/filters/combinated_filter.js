const Accommodation = require("../../models/Accommodation");
const Services = require('../../models/Services');
const LocationAccommodation = require('../../models/LocationAccommodation');

const combinatedFilter = async (req, res) => {

    const { city, country, rooms } = req.query;

    try {
        const locationsAccommodation = await Accommodation
            .find()
            .populate('idLocation')
            .populate('idServices');

        const filteredAccommodations = locationsAccommodation.filter(accommodation => {
            const cityMatch = !city || (accommodation.idLocation && accommodation.idLocation.city.match(new RegExp(city, 'i')));

            const countryMatch = !country || (accommodation.idLocation && accommodation.idLocation.country.match(new RegExp(country, 'i')));

            return cityMatch && countryMatch;
            
        }).map((accommodation) => {
            const idServices = accommodation.idServices.filter((service) => {
                const isBedroom = service.name === "Bedroom";
                const isRoomsMatch = !rooms || (service.quantity == rooms);
                return isBedroom && isRoomsMatch;
            });

            if (idServices.length > 0) {
                accommodation.idServices = idServices;
                return accommodation;
            }

            return null;
        }).filter((accommodation) => accommodation !== null);

        res.json(filteredAccommodations);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
}


module.exports = combinatedFilter;