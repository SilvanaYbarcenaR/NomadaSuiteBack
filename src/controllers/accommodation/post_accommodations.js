const Accommodation = require('../../models/Accommodation');
const LocationAccommodation = require('../../models/LocationAccommodation');
const Services = require('../../models/Services');

const postAccommodation = async (req, res) => {
  try {

    const { name, ownerId, Services, photos, description, price, city, country, zipCode, address, coordinates } = req.body;
    if (!name || !ownerId || !Services || services.length === 0 || !photos || photos.length === 0 || !description || !price || !city || !country || !zipCode || !address || !coordinates) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    const locationData = {
      city,
      country,
      zipCode,
      address,
      coordinates,
    };

    const newLocation = await LocationAccommodation.create(locationData);

    const selectedServices = req.body.services;

    const services = await Services.find({ _id: { $in: selectedServices } });

    const accommodationData = {
      name,
      ownerId,
      idServices: services,
      photos,
      idLocation: newLocation,
      description,
      price,
      isActive: req.body.isActive,
    };

    const newAccommodation = await Accommodation.create(accommodationData);

    res.json(newAccommodation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = postAccommodation;
