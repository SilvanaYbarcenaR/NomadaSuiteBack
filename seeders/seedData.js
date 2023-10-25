const mongoose = require('mongoose');
const Accommodation = require('../src/models/Accommodation');
const LocationAccommodation = require('../src/models/LocationAccommodation');
const Services = require('../src/models/Services');
const data_accommodations = require('./data_accommodation');
const data_location = require('./data_location');
const data_services = require('./data_services');

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://nomadasuite:FZ4xuOMeRT1UdSuc@nomadasuite.zkztyz0.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión a la base de datos exitosa.');

    const allServices = await Services.insertMany(data_services);
    console.log('Servicios insertados con éxito.');

    const locationIds = await LocationAccommodation.insertMany(data_location);

    for (let i = 0; i < data_accommodations.length; i++) {
      const accommodationData = data_accommodations[i];
      const locationId = locationIds[i % data_location.length]._id;
      const accommodation = new Accommodation({
        ...accommodationData,
        idLocation: locationId
      });

      const randomServices = getRandomServices(allServices, 4, accommodation.idServices);

      accommodation.idServices = randomServices.map(service => service._id);

      await accommodation.save();
    }

    console.log('Datos sembrados con éxito en la base de datos.');
  } catch (error) {
    console.error('Error al sembrar datos:', error);
  } finally {
    mongoose.connection.close();
  }
};

function getRandomServices(allServices, count, assignedServices) {
  const availableServices = allServices.filter(service => !assignedServices.some(assigned => assigned.name === service.name));
  const shuffledServices = availableServices.slice().sort(() => 0.5 - Math.random());
  return shuffledServices.slice(0, count);
}

seedDatabase();
