const { Router } = require("express");

const loginGoogleRouter = Router();

loginGoogleRouter.get("/google", (req, res) => {
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ message: "No autenticado" });
  }
});

module.exports = { loginGoogleRouter };
