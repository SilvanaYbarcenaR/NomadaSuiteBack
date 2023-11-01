const Accommodation = require("../../models/Accommodation");

const filteredByBedrooms = async (req, res) => {
  const bedroomsQuantity = req.body.quantity;
  // console.log(bedroomsQuantity);
  try {
    const filteredBedrooms = await Accommodation.find().populate("idServices");
    // console.log(filteredBedrooms);
    const filtered = filteredBedrooms
      .map((accommodation) => {
        const idServices = accommodation.idServices.filter((service) => {
          return (
            service.name === "Bedroom" && service.quantity === bedroomsQuantity
          );
        });

        if (idServices.length > 0) {
          accommodation.idServices = idServices;
          return accommodation;
        }

        return null;
      })
      .filter((accommodation) => accommodation !== null);

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

module.exports = filteredByBedrooms;
