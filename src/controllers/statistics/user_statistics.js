const User = require("../../models/User");

const getUsersStatistics = async (req, res) => {
  try {
    const allUsers = await User.find();

    const usersActive = allUsers.filter((user) => user.isActive === true);
    const usersInactive = allUsers.filter((user) => user.isActive === false);

    const response = [
      { name: "Usuarios activos", value: usersActive.length },
      { name: "Usuarios inactivos", value: usersInactive.length },
    ];

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las estadísticas de usuarios" });
  }
};

module.exports = getUsersStatistics;
