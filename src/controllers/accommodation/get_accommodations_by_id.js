const Accommodation = require('../../models/Accommodation');
const Services = require('../../models/Services');
const LocationAccommodation = require('../../models/LocationAccommodation');

const getAccommodationById = async (req, res) => {
  const accommodationId = req.params.id; 

  try {
    const accommodation = await Accommodation
      .findById(accommodationId)
      .populate('idServices') 
      .populate('idLocation'); 

    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation no encontrado' });
    }

    res.json(accommodation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = getAccommodationById;
