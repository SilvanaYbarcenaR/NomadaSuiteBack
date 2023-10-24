require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI

mongoose.connect(uri, {
 useNewUrlParser: true,
 useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
    console.error('Error conexión MongoDB', error);

})

db.once('open', () => {
    console.log('Conexión con MongoDb exitosa')
})

module.exports = { db }