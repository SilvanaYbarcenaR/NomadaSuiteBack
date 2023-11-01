const LocationAccommodation = require("../../models/LocationAccommodation");

const getLocation = async (req, res) => {
  try {
    const allLocations = await LocationAccommodation.find();

    const uniqueCities = new Set();

    allLocations.forEach((location) => {
      const cityCountry = `${location.city}, ${location.country}`;
      uniqueCities.add(cityCountry);
    });

    const uniqueCityArray = Array.from(uniqueCities);

    return res.json(uniqueCityArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = getLocation;
