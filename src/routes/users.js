const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/authJwt");

const userRouter = express.Router();

const {
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
  loginUsers,
} = require("../controllers/users");

userRouter.get("/data-users", verifyToken, isAdmin, getUsers);
userRouter.patch("/update-user/:id", updateUser);
userRouter.delete("/delete-user/:id", deleteUser);

userRouter.post("/register", createUsers);
userRouter.post("/login", loginUsers);

module.exports = userRouter;
