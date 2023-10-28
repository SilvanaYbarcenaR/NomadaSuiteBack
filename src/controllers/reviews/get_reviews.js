const Reviews = require('../../models/Reviews');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find({ isActive: true }).exec();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las revisiones' });
  }
};

module.exports = getAllReviews;