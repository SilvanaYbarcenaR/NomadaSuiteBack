const Accommodation = require("../../models/Accommodation");

const updateAccommodation = async (req, res) => {
  const id = req.params.id;
  try {
    const existingAccommodation = await Accommodation.findById(id);

    if (!existingAccommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    const updatedAccommodationData = req.body;

    // Verificar si se proporcionaron nuevas imágenes
    if (req.imageURLs) {
      const newPhotos = Array.isArray(req.imageURLs) ? req.imageURLs : [req.imageURLs];
      updatedAccommodationData.photos = newPhotos;
    }

    const updatedAccommodation = await Accommodation.findOneAndUpdate(
      { _id: id },
      { $inc: { __v: 1 }, $set: updatedAccommodationData },
      { new: true, useFindAndModify: false }
    );

    if (!updatedAccommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }
    res.status(200).json(updatedAccommodation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateAccommodation;
