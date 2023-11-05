const { Router } = require("express");

const loginGoogleRouter = Router();

loginGoogleRouter.get("/google", (req, res) => {
  if (req.user) {
    const { user, access_token, refresh_token } = req.user;

    return res.json({ user, access_token, refresh_token });
  } else {
    return res.status(401).json({ message: "No autenticado" });
  }
});

module.exports = { loginGoogleRouter };
