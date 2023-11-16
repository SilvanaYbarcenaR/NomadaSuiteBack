const Accommodation = require("../../models/Accommodation");
const Services = require('../../models/Services');

const updateAccommodation = async (req, res) => {
  const id = req.params.id;
  try {
    const existingAccommodation = await Accommodation.findById(id);

    if (!existingAccommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    // Crear un objeto de actualización dinámico
    const updateFields = {};
    
    // Verificar si se proporciona el campo 'services' en el cuerpo de la solicitud
    if (req.body.services) {
      // Obtener los datos de servicios usando los IDs proporcionados en 'services'
      const selectedServices = req.body.services;
      const servicesData = await Services.find({ _id: { $in: selectedServices } });

      // Asignar los valores a 'idServices' en el modelo 'Accommodation'
      updateFields.idServices = servicesData;
    }

    // Verificar si se proporciona el campo 'imageURLs' en el cuerpo de la solicitud
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
