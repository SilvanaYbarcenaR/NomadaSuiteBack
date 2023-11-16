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

    const response = [
      { name: "Alojamientos activos", value: accommodationsActives.length },
      { name: "Alojamientos inactivos", value: accommodationsInactives.length },
    ];

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las estadísticas de alojamientos" });
  }
};

module.exports = getAccomodationsStatistics;
