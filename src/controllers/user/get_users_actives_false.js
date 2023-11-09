const User = require("../../models/User");

const getUsersActivesFalse = async (req, res) => {
  try {
    const users = await User.find();

    const usersActivesFalse = users.filter((user) => user.isActive === false);

    if (!usersActivesFalse) throw new Error("Users actives false not found");

    res.status(200).json(usersActivesFalse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUsersActivesFalse;
