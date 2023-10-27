const User = require('../../models/User');

const registerUser = async (req, res) => {
    try {
        const requiredFields = ['userName', 'firstName', 'lastName', 'email', 'password', 'birthdate'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `El campo ${field} es obligatorio.` });
            }
        }

        const userData = {
            ...req.body,
            isAdmin: false,
            isActive: true, 
        };

        const newUser = new User(userData);

        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo registrar el usuario' });
    }
};

module.exports = registerUser;
