const Accommodation = require("../../models/Accommodation");

const filteredByPrice = async (req, res) => {
  try {
    const { min, max } = req.query;
    const allAccommodation = await Accommodation.find({});
    const rango = allAccommodation.filter(
      (casa) => casa.price >= Number(min) && casa.price <= Number(max)
    );
    console.log("gaaaaaa");
    res.status(200).json(rango);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = filteredByPrice;
