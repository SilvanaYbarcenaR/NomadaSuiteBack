const User = require('../../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { userName, firstName, lastName, email, password, birthdate } = req.body;

        if (!userName || !firstName || !lastName || !email || !password || !birthdate) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }


        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado', userId: existingEmail._id });
        }

        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(400).json({ error: 'El nombre de usuario ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthdate,
            isAdmin: false,
            isActive: true,
            googleId
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'No se pudo registrar el usuario' });
    }
};

module.exports = registerUser;
