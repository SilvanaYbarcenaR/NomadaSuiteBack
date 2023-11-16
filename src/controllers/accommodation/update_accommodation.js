const Accommodation = require("../../models/Accommodation");
const Services = require('../../models/Services');

const updateAccommodation = async (req, res) => {
  const id = req.params.id;
  try {
    const existingAccommodation = await Accommodation.findById(id);

    if (!existingAccommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    const updateFields = {};

    if (req.body.services) {

      const selectedServices = req.body.services;
      const servicesData = await Services.find({ _id: { $in: selectedServices } });

      updateFields.idServices = servicesData;
    }

    if (req.body.imageURLs) {
      const newPhotos = Array.isArray(req.body.imageURLs) ? req.body.imageURLs : [req.body.imageURLs];
      updateFields.photos = newPhotos;
    }

    const updatedAccommodation = await Accommodation.findOneAndUpdate(
      { _id: id },
      { $inc: { __v: 1 }, $set: updateFields },
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
