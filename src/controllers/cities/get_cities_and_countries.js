const axios = require("axios");

// const cityName = "Buenos Aires";

async function getCityInfo(req, res) {
  const { name } = req.query;
  console.log(name);
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/city?name=${name}`,
      {
        headers: {
          "X-Api-Key": "zVh59PsK2fzJfeEPGuZ8fA==Fdb2kJC7srMXa2Km",
        },
      }
    );

    const cityData = response.data;

    if (!cityData) throw new Error(" request error");

    return res.json(cityData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = getCityInfo;
