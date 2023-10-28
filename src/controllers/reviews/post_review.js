const Reviews = require('../../models/Reviews');
const User = require('../../models/User'); 
const Accommodation = require('../../models/Accommodation'); 

const createReview = async (req, res) => {
    const { idUser, idAccommodation, comment, rating, isActive } = req.body;

    if (!idUser || !idAccommodation || !comment || !rating || isActive === undefined) {
        return res.status(400).json({ error: 'Se requiere toda la información para crear la revisión' });
    }

    try {
        const userExists = await User.findById(idUser);
        const accommodationExists = await Accommodation.findById(idAccommodation);

        if (!userExists || !accommodationExists) {
            return res.status(404).json({ error: 'El usuario o la acomodación no existen' });
        }

        const newReview = new Reviews({
            idUser,
            idAccommodation,
            comment,
            rating,
            isActive: isActive || true,
        });

        await newReview.save();
        res.status(201).json({ message: 'Revisión creada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'No se pudo crear la revisión' });
    }
};

module.exports = createReview;
