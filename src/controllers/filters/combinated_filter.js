const Accommodation = require("../../models/Accommodation");
const getAverageReviews = require('../reviews/get_average_reviews');
const Services = require('../../models/Services');
const LocationAccommodation = require('../../models/LocationAccommodation');

const combinatedFilter = async (req, res) => {

    const { city, country, rooms, min, max, orderByPrice, orderByRating } = req.query;

    let responseSent = false;

    try {

        function normalizeText(text) {
            if (text) {
                return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }
            return "";
        }

        const locationsAccommodation = await Accommodation
            .find()
            .populate('idLocation')
            .populate('idServices');

        const accommodationsWithRatings = await Promise.all(locationsAccommodation.map(async (accommodation) => {
            const { _id: accommodationId } = accommodation;
            const rating = await getAverageReviews({ body: { accommodationId } }, {
                json: (data) => data
            });

            return { ...accommodation._doc, rating: rating.averageRating };
        }));

        const filteredAccommodations = accommodationsWithRatings
            .filter(accommodation => accommodation.isActive === true)
            .filter(accommodation => {

                let cityMatch = false;

                if (accommodation.idLocation) {
                    const normalizedCity = normalizeText(city);
                    const normalizedLocationCity = normalizeText(accommodation.idLocation.city);
                    const normalizedLocationCountry = normalizeText(accommodation.idLocation.country);

                    if (normalizedLocationCity.match(new RegExp(normalizedCity, 'i'))) {
                        cityMatch = true;
                    } else if (!normalizedLocationCity.match(new RegExp(normalizedCity, 'i')) && normalizedLocationCountry.match(new RegExp(normalizedCity, 'i'))) {
                        cityMatch = true;
                    }
                }

                const countryMatch = !country || (accommodation.idLocation && normalizeText(accommodation.idLocation.country).match(new RegExp(normalizeText(country), 'i')));

                return cityMatch && countryMatch;

            })
            .map((accommodation) => {
                const idServices = accommodation.idServices.filter((service) => {
                    const isBedroom = service.name === "Habitación";
                    const isRoomsMatch = !rooms || (service.quantity == rooms);
                    return isBedroom && isRoomsMatch;
                });

                if (idServices.length > 0) {
                    accommodation.idServices = idServices;
                    return accommodation;
                }

                return null;
            })
            .filter((accommodation) => accommodation !== null)
            .filter(
                (accommodation) => {
                    const priceMatch = (!min || accommodation.price >= Number(min)) && (!max || accommodation.price <= Number(max));

                    return priceMatch;
                }
            )
            .sort((a, b) => {
                if (orderByPrice === 'max-min') {
                    return b.price - a.price;
                } else if (orderByPrice === 'min-max') {
                    return a.price - b.price;
                }

                return 0;
            })
            .sort((a, b) => {
                if (orderByRating === 'max-min') {
                    return b.rating - a.rating;
                } else if (orderByRating === 'min-max') {
                    return a.rating - b.rating;
                }

                return 0;
            })

        if (filteredAccommodations.length === 0) {
            responseSent = true;
            res.status(404).json({ message: 'Los parámetros indicados no corresponden a ningún alojamiento' })
        }

        if (!responseSent) {
            res.status(200).json(filteredAccommodations);
        }

    } catch (error) {
        console.error(error);
        if (!responseSent) {
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    }
}


module.exports = combinatedFilter;