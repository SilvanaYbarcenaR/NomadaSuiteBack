const Reviews = require('../../models/Reviews');

const updateReview = async (req, res) => {
  const reviewId = req.params.id; 
  const updateData = req.body; 

  try {
    const updatedReview = await Reviews.findByIdAndUpdate(reviewId, updateData, { new: true }).exec();

    if (!updatedReview) {
      return res.status(404).json({ error: 'Revisión no encontrada' });
    }

    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la revisión' });
  }
};

module.exports = updateReview

