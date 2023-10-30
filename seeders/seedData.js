const mongoose = require('mongoose');
const Accommodation = require('../src/models/Accommodation');
const LocationAccommodation = require('../src/models/LocationAccommodation');
const Services = require('../src/models/Services');
const data_accommodations = require('./data_accommodation');
const data_location = require('./data_location');
const data_services = require('./data_services');

const seedDatabase = async () => {
  let allServices; 

  try {
    await mongoose.connect('mongodb+srv://nomadasuite:FZ4xuOMeRT1UdSuc@nomadasuite.zkztyz0.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión a la base de datos exitosa.');

    const existingServices = await Services.find({});
    if (existingServices.length === 0) {
      allServices = await Services.insertMany(data_services); 
      console.log('Servicios insertados con éxito.');
    } else {
      console.log('Los servicios ya existen en la base de datos. No se han insertado servicios adicionales.');
      allServices = existingServices; 
    }

    const locationIds = await LocationAccommodation.insertMany(data_location);

    for (let i = 0; i < data_accommodations.length; i++) {
      const accommodationData = data_accommodations[i];
      const locationId = locationIds[i % data_location.length]._id;
      const accommodation = new Accommodation({
        ...accommodationData,
        idLocation: locationId
      });

      const randomServices = getRandomServices(allServices, Array.isArray(accommodation.idServices) ? accommodation.idServices : []);
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


function getRandomServices(allServices, assignedServices) {
  const requiredServiceNames = ["Bathroom", "Kitchen", "Wifi"]; 

  const randomServices = [];

  requiredServiceNames.forEach(requiredServiceName => {
    const requiredService = allServices.find(service => service.name === requiredServiceName);
    randomServices.push(requiredService);
  });

  const remainingBedrooms = allServices.filter(service => service.name === "Bedroom" && !assignedServices.some(assigned => assigned.name === "Bedroom"));

  if (remainingBedrooms.length > 0) {
    const randomBedroom = remainingBedrooms[Math.floor(Math.random() * remainingBedrooms.length)];
    randomServices.push(randomBedroom);
  } else {
    const assignedBedrooms = assignedServices.filter(assigned => assigned.name === "Bedroom");
    const randomAssignedBedroom = assignedBedrooms[Math.floor(Math.random() * assignedBedrooms.length)];
    randomServices.push(randomAssignedBedroom);
  }

  return randomServices;
}



seedDatabase();
