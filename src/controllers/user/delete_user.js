const User = require('../../models/User');

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; 

        // Verifica que el usuario exista
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.remove();

        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {

        res.status(500).json({ error: 'No se pudo eliminar el usuario' });
    }
};

module.exports = deleteUser;
