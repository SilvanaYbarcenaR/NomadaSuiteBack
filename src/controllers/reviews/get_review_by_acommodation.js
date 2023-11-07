const Reviews = require('../../models/Reviews');

const getAllReviewsByAccommodationId = async (req, res) => {
  const accommodationId = req.params.id; 

  try {
    const reviews = await Reviews.find({ idAccommodation: accommodationId, isActive: true }).exec();

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las revisiones de la acomodación' });
  }
};


module.exports = getAllReviewsByAccommodationId

