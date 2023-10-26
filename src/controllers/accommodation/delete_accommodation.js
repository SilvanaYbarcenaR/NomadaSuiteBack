const Accommodation = require("../../models/Accommodation");
const Services = require("../../models/Services");
const LocationAccommodation = require("../../models/LocationAccommodation");

const deleteAccommodation = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteAccommodation = await Accommodation.findByIdAndDelete({
      _id: id,
    });
    if (!deleteAccommodation) throw new Error("Error removing accommodation");
    res.status(200).json({ message: "Accommodation removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteAccommodation;
