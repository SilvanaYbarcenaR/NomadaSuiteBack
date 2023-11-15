const Reviews = require('../../models/Reviews');

const getDesactiveReviews = async (req, res) => {
    try {
        const reviewsWithVGreaterThanZeroAndInactive = await Reviews.find({ __v: { $gt: 0 }, isActive: false });

        res.json(reviewsWithVGreaterThanZeroAndInactive);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las revisiones' });
    }
};

module.exports = getDesactiveReviews;
