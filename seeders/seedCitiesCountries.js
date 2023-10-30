const mongoose = require("mongoose");
const CitiesCountries = require("../src/models/CitiesCountries");
const data_CitiesCountries = require("./data_citiesCountries");

async function seedCitiesCountries() {
  try {
    // Conecta a la base de datos MongoDB
    await mongoose.connect(
      "mongodb+srv://nomadasuite:FZ4xuOMeRT1UdSuc@nomadasuite.zkztyz0.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Successful connection to MongoDB");

    // Itera sobre el array y crea documentos de CitiesCountries
    for (const cityCountry of data_CitiesCountries) {
      const newCityCountry = new CitiesCountries({
        city: cityCountry.city,
        country: cityCountry.country,
      });

      // Guarda el documento en la base de datos
      await newCityCountry.save();
      console.log(
        `It has been saved ${cityCountry.city}, ${cityCountry.country}`
      );
    }

    // Cierra la conexión a la base de datos
    mongoose.connection.close();
    console.log("Connection to MongoDB closed");
  } catch (error) {
    console.error("Error seeding data into database:", error);
  }
}

seedCitiesCountries();
