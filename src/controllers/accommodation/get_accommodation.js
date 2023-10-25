const Accommodation = require('../../models/Accommodation');
const Services = require('../../models/Services');
const LocationAccommodation = require('../../models/LocationAccommodation');

const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation
      .find()
      .populate('idServices') 
      .populate('idLocation'); 

    res.json(accommodations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = getAccommodations;
