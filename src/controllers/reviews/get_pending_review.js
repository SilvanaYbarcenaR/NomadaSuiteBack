const Reviews = require('../../models/Reviews');

const getPendingReviews = async (req, res) => {
  try {
    const reviewsWithVZeroAndInactive = await Reviews.find({ __v: 0, isActive: false });

    res.json(reviewsWithVZeroAndInactive);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las revisiones' });
}
};

module.exports = getPendingReviews;
