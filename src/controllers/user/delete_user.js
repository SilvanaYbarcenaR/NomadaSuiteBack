const User = require('../../models/User');

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.deleteOne({ _id: userId });

        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo eliminar el usuario', details: error.message });
    }
};

module.exports = deleteUser;

