const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  getUsersActives,
} = require("../controllers/index");

userRouter.get("/", getAllUsers);
userRouter.get("/actives", getUsersActives);
userRouter.get("/:id", getUserById);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/actives", getUsersActives);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = { userRouter };
