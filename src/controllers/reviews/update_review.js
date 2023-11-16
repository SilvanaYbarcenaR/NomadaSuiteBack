const Reviews = require('../../models/Reviews');

const updateReview = async (req, res) => {
  const reviewId = req.params.id; 
  const updateData = req.body; 

  try {
    const existingReview = await Reviews.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({ error: 'Revisión no encontrada' });
    }

    const updatedReview = await Reviews.findOneAndUpdate(
      { _id: reviewId },
      { $inc: { __v: 1 }, $set: updateData }, 
      { new: true, useFindAndModify: false }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: 'Revisión no encontrada' });
    }

    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la revisión' });
  }
};

module.exports = updateReview;
