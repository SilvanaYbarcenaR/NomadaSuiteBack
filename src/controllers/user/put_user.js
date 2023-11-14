const User = require('../../models/User');
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const userData = req.body;

    const newImage = Array.isArray(req.imageURLs) ? req.imageURLs[0] : req.imageURLs;

    if (newImage) {
      userData.profileImage = newImage; 
    }

    const password = req.body.password;
    let hashedPassword = null;

    if(password) {
      hashedPassword = await bcrypt.hash(password, 10);
      userData.password = hashedPassword; 
    }

    user.set(userData);
    await user.save();

    res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el usuario' });
  }
};

module.exports = updateUser;
