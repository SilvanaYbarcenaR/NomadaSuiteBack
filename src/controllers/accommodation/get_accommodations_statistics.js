const Accommodation = require("../../models/Accommodation");

const getAccomodationsStatistics = async (req, res) => {
  try {
    const allAccommodations = await Accommodation.find();

    const accommodationsActives = allAccommodations.filter(
      (accommodation) => accommodation.isActive === true
    );

    const accommodationsInactives = allAccommodations.filter(
      (accommodation) => accommodation.isActive === false
    );

    const percentageActive = calculatePercentage(
      accommodationsActives,
      allAccommodations
    );

    const percentageInactive = calculatePercentage(
      accommodationsInactives,
      allAccommodations
    );

    const response = [
      { name: "Alojamientos activos", value: percentageActive },
      { name: "Alojamientos inactivos", value: percentageInactive },
    ];

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las estadísticas de alojamientos" });
  }
};

const calculatePercentage = (subset, total) => {
  if (total.length === 0) {
    return 0;
  }
  const percentage = ((subset.length / total.length) * 100).toFixed(2);
  return parseFloat(percentage);
};

module.exports = getAccomodationsStatistics;
