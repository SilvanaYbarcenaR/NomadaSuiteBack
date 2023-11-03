require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const secretKey = process.env.SECRET_KEY;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });

    // Including all user information in the response
    res.json({
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        profileImage: user.profileImage,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthdate: user.birthdate,
        wantsNotifications: user.wantsNotifications,
        isActive: user.isActive,
        isOwner: user.isOwner,
        isAdmin: user.isAdmin
        // Include other user information here based on the model
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = loginUser;
