const Reviews = require('../../models/Reviews');

const getRatingStatistics = async (req, res) => {
  try {
    const ratings = await Reviews.find({ isActive: true }).select('rating');

    const ratingCount = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
    };

    ratings.forEach((review) => {
      
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCount[review.rating.toString()] += 1;
      }
    });

    const response = Object.entries(ratingCount).map(([rating, count]) => ({
      rating: parseInt(rating),
      count,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = getRatingStatistics;
