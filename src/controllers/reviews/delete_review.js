const Reviews = require('../../models/Reviews');

const deleteReview = async (req, res) => {
    const reviewId = req.params.id; 
  
    try {
      const deletedReview = await Reviews.findByIdAndDelete(reviewId).exec();
  
      if (!deletedReview) {
        return res.status(404).json({ error: 'Revisión no encontrada' });
      }
  
      res.json({ message: 'Revisión eliminada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la revisión' });
    }
  };

  module.exports = deleteReview
 