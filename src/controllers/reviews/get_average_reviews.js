const Accommodation = require("../../models/Accommodation");

const accommodationReviews = [
  {
    _id: "6539abd30fb51e3eb7458be1",
    name: "Apartamento Acogedor en el Centro",
    idReviews: [
      {
        //1
        idUser: ["653b5786ce95373e9299d384"],
        idAccommodation: ["6539abd30fb51e3eb7458be1"],
        comment:
          "Hermoso apartamento con patio y vista espectacular en una zona muy tranquila y bien cuidada. Todo está muy limpio y funcional. El anfitrión siempre está disponible y es receptivo.",
        rating: 4,
        isActive: true,
      },
      {
        idUser: ["653b57c9c8544ce29eca81d4"],
        idAccommodation: ["6539abd30fb51e3eb7458be1"],
        comment:
          "La llegada y la salida fueron muy fáciles, el asegurador, bien organizado, el anfitrión, fue muy atento y nos dio consejos para el área. La casa está amueblada con amor para su uso.",
        rating: 5,
        isActive: true,
      },
      {
        idUser: ["653b59f1cf40a54de025d6e0"],
        idAccommodation: ["6539abd30fb51e3eb7458be1"],
        comment:
          "Hermosa casa, muy bien amueblada y excelente ubicación. El anfitrión estaba muy disponible para todas las solicitudes",
        rating: 5,
        isActive: true,
      },
    ],
    photos: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119989.jpg?k=92a6dc3c7a5c697494cfbe0664f01f33c7fab4206d994265bbbff971c98e01f3&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119983.jpg?k=af7f0e0a5d52f710f316c194511440c7308d1fd974a560eccab368b18ce4254e&o=&hp=1",
    ],
    idLocation: "6539abd30fb51e3eb7458bd6",
    description: "Un apartamento cómodo en el corazón de la ciudad editado.",
    price: 100,
    isActive: true,
    __v: 0,
  },
];

const getAverageReviews = async (req, res) => {
  const accommodationId = req.params.id;
  try {
    // const accommodationReviews = await findById(accommodationId).populate(
    //   idReviews
    // );
    if (accommodationReviews.length === 0) {
      return null; // Si no hay revisiones, el promedio es null
    }
    let totalRating = 0;
    let totalReviews = 0;

    for (const accommodation of accommodationReviews) {
      const reviews = accommodation.idReviews;
      for (const review of reviews) {
        totalRating += review.rating;
        totalReviews += 1;
      }
    }

    const averageRating = totalRating / totalReviews;

    const roundedAverage = averageRating.toFixed(1); // Redondear a 1 decimal

    return res.json(roundedAverage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAverageReviews;

//recibo por params el ID del accommodation
//Busco las reviews
//Promedio del raiting
