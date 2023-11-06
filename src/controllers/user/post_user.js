const User = require('../../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthdate, profileImage, googleId } = req.body;

        let baseUserName = (firstName + lastName).toLowerCase().replace(/\s/g, ''); 

        let userName = baseUserName;
        let userNameExists = true;
        let count = 0;

        while (userNameExists) {

            const existingUserName = await User.findOne({ userName });

            if (existingUserName) {

                userName = baseUserName + count;
                count++;
            } else {
                userNameExists = false; 
            }
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado', userFound: existingEmail });
        }

        let hashedPassword = null;

        if(password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        /* const images = req.avatarImageURLs || []; */

        const newUser = new User({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthdate,
            profileImage,
            isAdmin: false,
            isActive: true,
            googleId
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito', userId: newUser._id, generatedUserName: userName, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'No se pudo registrar el usuario' });
    }
};

module.exports = registerUser;