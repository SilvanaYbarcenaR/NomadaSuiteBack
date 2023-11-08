const User = require("../../models/User");

const getUsersActives = async (req, res) => {
  try {
    const users = await User.find();

    const usersActives = users.filter((user) => user.isActive === true);
    console.log(usersActives.length);
    if (!usersActives) throw new Error("Users actives not found");

    res.status(200).json(usersActives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUsersActives;
