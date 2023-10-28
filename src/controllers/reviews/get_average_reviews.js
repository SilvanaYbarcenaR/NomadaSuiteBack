const Accommodation = require('../../models/Accommodation');
const Reviews = require('../../models/Reviews');

const getAverageReviews = async (req, res) => {
  const { accommodationId } = req.body; 

  try {
    if (!accommodationId) {
      return res.status(400).json({ error: 'Se requiere el ID del alojamiento' });
    }

    const accommodation = await Accommodation.findById(accommodationId).exec();

    if (!accommodation) {
      return res.status(404).json({ error: 'Alojamiento no encontrado' });
    }

    const reviews = await Reviews.find({ idAccommodation: accommodationId, isActive: true }).exec();

    if (reviews.length === 0) {
      return res.json({ averageRating: null }); 
    }

    let totalRating = 0;
    let totalReviews = 0;

    for (const review of reviews) {
      totalRating += review.rating;
      totalReviews += 1;
    }

    const averageRating = totalRating / totalReviews;
    const roundedAverage = Math.round(averageRating * 10) / 10; 

    return res.json({ averageRating: roundedAverage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener y calcular las revisiones' });
  }
};

module.exports = getAverageReviews;
