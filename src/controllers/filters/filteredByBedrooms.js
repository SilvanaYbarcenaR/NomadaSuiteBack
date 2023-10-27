const Accommodation = require("../../models/Accommodation");

const filteredByBedrooms = async (req, res) => {
  const bedroomsQuantity = req.body.quantity;

  try {
    const filteredBedrooms = await Accommodation.find().populate("idServices");

    return res.json(filteredBedrooms);
  } catch (error) {
    return res.status(500).json({ error: "Error processing request" });
  }
};

module.exports = filteredByBedrooms;

// const filteredByBedrooms = async (req, res) => {
//   const bedroomsQuantity = req.body.quantity;

//   try {
//     const accommodations = await Accommodation.find().populate("idServices");

//     // Filtrar las habitaciones que cumplan con los criterios
//     const filteredAccommodations = accommodations.filter((accommodation) => {
//       const bedrooms = accommodation.idServices.filter((service) => {
//         return (
//           service.name === "Bedroom" && service.quantity >= bedroomsQuantity
//         );
//       });

//       return bedrooms.length > 0;
//     });

//     return res.json(filteredAccommodations);
//   } catch (error) {
//     return res.status(500).json({ error: "Error processing request" });
//   }
// };
