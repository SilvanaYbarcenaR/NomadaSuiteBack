const mongoose = require('mongoose');
const Accommodation = require('../src/models/Accommodation'); 
const LocationAccommodation = require('../src/models/LocationAccommodation'); 
const Services = require('../src/models/models/Services'); 
import data_accommodations from'./data_accommodation'
import data_location from'./data_location'

const seedDatabase = async () => {
    const locationIds = await LocationAccommodation.insertMany(data_location);
    const servicesIds = await Services.insertMany(data_services);

    const accommodationsWithIds = data_accommodations.map((accommodation, index) => ({
        ...accommodation,
        idLocation: locationIds[index]._id,
        idServices: [servicesIds[0]._id, servicesIds[1]._id] 
    }));

    await Accommodation.insertMany(accommodationsWithIds);
    
    console.log('Datos sembrados con éxito en la base de datos.');
    mongoose.connection.close();
};

mongoose.connect('mongodb+srv://nomadasuite:FZ4xuOMeRT1UdSuc@nomadasuite.zkztyz0.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        seedDatabase();
    }
});