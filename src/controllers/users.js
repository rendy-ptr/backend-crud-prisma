const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const prisma = new PrismaClient();

const createUsers = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hash(password, saltRounds);
    const prismaGetUsers = await prisma.user.findMany();
    const checkEmail = prismaGetUsers.find((user) => user.email === email);
    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const prismaUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json({
      message: "Success Create",
      data: prismaUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "There was an error creating the user",
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const prismaGetUsers = await prisma.user.findMany();
    res.status(200).json({
      message: "Success Get Users",
      data: prismaGetUsers,
    });
  } catch (error) {
    res.status(400).json({
      message: "There was an error getting the users",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(400).json({
          message: "There was an error creating the hash password",
          error: err.message,
        });
      }
      const prismaUpdateUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username,
          email,
          password: hash,
        },
      });
      res.status(200).json({
        message: "Success Update",
        data: prismaUpdateUser,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "There was an error updating the user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const prismaDeleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "Success Delete",
      data: prismaDeleteUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "There was an error deleting the user",
      error: error.message,
    });
  }
};

const loginUsers = async (req, res) => {
  const { email, password } = req.body;
  try {
    const prismaLoginUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const validatePassword = bcrypt.compare(password, prismaLoginUser.password);
    if (!validatePassword) {
      res.status(400).json({
        message: "Password is incorrect",
      });
    }
    res.status(200).json({
      message: "Success Login",
      data: prismaLoginUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "There was an error logging in the user",
      error: error.message,
    });
  }
};

module.exports = {
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
  loginUsers,
};
