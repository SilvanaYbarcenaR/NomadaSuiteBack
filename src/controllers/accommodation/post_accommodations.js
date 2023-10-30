const Accommodation = require('../../models/Accommodation');
const LocationAccommodation = require('../../models/LocationAccommodation');
const Services = require('../../models/Services');

const postAccommodation = async (req, res) => {
  try {
    const { name, ownerId, services, description, price, city, country, zipCode, address, coordinates } = req.body;
    
    const locationData = {
      city,
      country,
      zipCode,
      address,
      coordinates,
    };
    const newLocation = await LocationAccommodation.create(locationData);

    const selectedServices = services;
    const servicesData = await Services.find({ _id: { $in: selectedServices } });

    const photos = req.imageURLs || []; 

    const accommodationData = {
      name,
      ownerId,
      idServices: servicesData, 
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
