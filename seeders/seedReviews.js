const mongoose = require('mongoose');
const Review = require('../src/models/Reviews'); 
const User = require('../src/models/User'); 
const Accommodation = require('../src/models/Accommodation'); 
const data_reviews = require('./data_reviews'); 

const generateRandomReviews = async () => {
  try {
    await mongoose.connect('mongodb+srv://nomadasuite:FZ4xuOMeRT1UdSuc@nomadasuite.zkztyz0.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const users = await User.find({}, '_id');
    const accommodations = await Accommodation.find({}, '_id');

    const dataReviewsWithIds = data_reviews.map(review => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAccommodation = accommodations[Math.floor(Math.random() * accommodations.length)];

      return {
        idUser: randomUser._id,
        idAccommodation: randomAccommodation._id,
        ...review
      };
    });

    await Review.insertMany(dataReviewsWithIds);
    console.log('Reseñas generadas y guardadas con éxito.');

  } catch (error) {
    console.error('Error al generar reseñas:', error);
  } finally {
    mongoose.connection.close();
  }
};

generateRandomReviews();
