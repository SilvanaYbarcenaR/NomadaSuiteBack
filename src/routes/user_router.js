const express = require('express');
const userRouter = express.Router();
const {registerUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/index');

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/register', registerUser);
userRouter.post('/update/:id', updateUser);
userRouter.post('/delete/:id', deleteUser);

module.exports = {userRouter}
