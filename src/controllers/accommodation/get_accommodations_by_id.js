const Accommodation = require('../../models/Accommodation');
const Services = require('../../models/Services');
const LocationAccommodation = require('../../models/LocationAccommodation');
const getAverageReviews = require('../reviews/get_average_reviews');

const getAccommodationById = async (req, res) => {
  const accommodationId = req.params.id;

  try {
    const accommodation = await Accommodation
      .findById(accommodationId)
      .populate('idServices')
      .populate('idLocation');

    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation no encontrado' });
    }

    const rating = await getAverageReviews({ body: { accommodationId } }, {
      json: (data) => data
    });

    const accommodationWithRating = { ...accommodation._doc, rating: rating.averageRating };
    res.json(accommodationWithRating);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = getAccommodationById;
