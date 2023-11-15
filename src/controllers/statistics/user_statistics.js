const User = require("../../models/User");

const getUsersStatistics = async (req, res) => {
  try {
    const allUsers = await User.find();

    const usersActive = allUsers.filter((user) => user.isActive === true);

    const usersInactive = allUsers.filter((user) => user.isActive === false);

    const percentageActive = calculatePercentage(usersActive, allUsers);

    const percentageInactive = calculatePercentage(usersInactive, allUsers);

    const response = [
      { name: "Usuarios activos", value: percentageActive },
      { name: "Usuarios inactivos", value: percentageInactive },
    ];

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las estadísticas de usuarios" });
  }
};

const calculatePercentage = (subset, total) => {
  if (total.length === 0) {
    return 0;
  }
  const percentage = ((subset.length / total.length) * 100).toFixed(2);
  return parseFloat(percentage);
};

module.exports = getUsersStatistics;
