const Accommodation = require("../../models/Accommodation");
const Services = require('../../models/Services');
const LocationAccommodation = require('../../models/LocationAccommodation');

const combinatedFilter = async (req, res) => {

    const { city, country, quantity } = req.query;

    try {

        const locationsAccommodation = await Accommodation
        .find()
        .populate('idLocation')
        .populate('idServices')

        const filteredAccommodations = locationsAccommodation
        .filter(accommodation => {
            return (
                accommodation.idLocation &&
                accommodation.idLocation.city.match(new RegExp(city, 'i')) &&
                accommodation.idLocation.country.match(new RegExp(country, 'i')
            ))
        })
        .map((accommodation) => {
            const idServices = accommodation.idServices.filter((service) => {
              return (
                service.name === "Bedroom" && service.quantity == quantity
              );
            });
    
            if (idServices.length > 0) {
              accommodation.idServices = idServices;
              return accommodation;
            }
    
            return null;
          })
          .filter((accommodation) => accommodation !== null);

        res.json(filteredAccommodations);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }

}

module.exports = combinatedFilter;