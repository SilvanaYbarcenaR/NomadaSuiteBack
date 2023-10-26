const Accommodation = require("../../models/Accommodation");

const updateAccommodation = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updateAccommodation = await Accommodation.findByIdAndUpdate(
      id,
      body,
      { new: true, useFindAndModify: false }
    );

    if (!updateAccommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }
    res.status(200).json(updateAccommodation);
  } catch (error) {
    res.staus(400).json({ error: error.message });
  }
};

module.exports = updateAccommodation;
