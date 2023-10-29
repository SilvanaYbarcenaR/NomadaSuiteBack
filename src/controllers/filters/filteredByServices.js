const Accommodation = require("../../models/Accommodation");

const filteredByServices = async (req, res) => {
  const services = req.body.services; // Los servicios deben ser pasados en un array en req.body

  try {
    const filteredAccommodations = await Accommodation.find().populate(
      "idServices"
    );

    const filtered = filteredAccommodations.filter((accommodation) => {
      const matchedServices = services.filter((service) => {
        return accommodation.idServices.some((accService) => {
          return (
            accService.name === service.name &&
            accService.quantity === service.quantity
          );
        });
      });

      return matchedServices.length === services.length;
    });

    if (filtered.length === 0) {
      return res
        .status(404)
        .json({ error: "No matching accommodations found" });
    }

    return res.json(filtered);
  } catch (error) {
    return res.status(500).json({ error: "Error processing request" });
  }
};

module.exports = filteredByServices;
