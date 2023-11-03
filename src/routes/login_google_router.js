const { Router } = require("express");

const loginGoogleRouter = Router();
loginGoogleRouter.get("/google", (req, res) =>
  res.redirect("http://localhost:5173/home")
);

module.exports = { loginGoogleRouter };
