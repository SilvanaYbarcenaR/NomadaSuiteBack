const Accommodation = require('../../models/Accommodation');
const Services = require('../../models/Services');
const LocationAccommodation = require('../../models/LocationAccommodation');
const getAverageReviews = require('../reviews/get_average_reviews'); 


const getDesactiveAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation
      .find({ isActive: false, __v: { $gt: 0 } }) 
      .populate('idServices')
      .populate('idLocation');

    const accommodationsWithRatings = await Promise.all(accommodations.map(async (accommodation) => {
      const { _id: accommodationId } = accommodation;
      const rating = await getAverageReviews({ body: { accommodationId } }, {
        json: (data) => data
      });

      return { ...accommodation._doc, rating: rating.averageRating };
    }));

    res.json(accommodationsWithRatings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = getDesactiveAccommodations;
