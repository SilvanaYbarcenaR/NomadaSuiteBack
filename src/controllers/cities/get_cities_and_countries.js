const CitiesCountries = require("../../models/CitiesCountries");
const unorm = require("unorm");

async function getCityInfo(req, res) {
  let city = req.query.city;
  if (!city) throw new Error("You must enter a name");
  city = unorm.nfd(city).replace(/[\u0300-\u036f]/g, "");
  try {
    const normalizedData = await CitiesCountries.find({}).lean();

    // Normaliza la consulta
    const normalizedQuery = unorm.nfd(city).replace(/[\u0300-\u036f]/g, "");

    // Filtra los resultados que coinciden con la consulta normalizada
    const found = normalizedData.filter((item) => {
      const normalizedCity = unorm
        .nfd(item.city)
        .replace(/[\u0300-\u036f]/g, "");
      return normalizedCity
        .toLowerCase()
        .startsWith(normalizedQuery.toLowerCase());
    });

    res.json(found);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar países" });
  }
}

module.exports = getCityInfo;
