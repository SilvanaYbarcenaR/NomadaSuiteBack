const Reviews = require('../../models/Reviews');

const getDesactiveReviews = async (req, res) => {
  try {
    const inactiveReviews = await Reviews.find({ isActive: false }).exec();
    res.json(inactiveReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las revisiones desactivadas' });
  }
};

module.exports = getDesactiveReviews;
