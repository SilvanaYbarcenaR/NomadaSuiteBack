const Accommodation = require('../../models/Accommodation');
const Services = require('../../models/Services');
const LocationAccommodation = require('../../models/LocationAccommodation');
const getAverageReviews = require('../reviews/get_average_reviews'); 

const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation
      .find()
      .populate('idServices') 
      .populate('idLocation'); 

    const accommodationsWithRatings = await Promise.all(accommodations.map(async (accommodation) => {
      const { _id: accommodationId } = accommodation;
      const rating = await getAverageReviews({ body: { accommodationId } }, { // Simula la llamada a la función getAverageReviews
        json: (data) => data // Simula el objeto de respuesta de la función
      });

      return { ...accommodation._doc, rating: rating.averageRating };
    }));

    res.json(accommodationsWithRatings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = getAccommodations;
