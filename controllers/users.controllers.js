const {
  fetchAllUsers,
  selectUserByEmail,
  insertUserByEmail,
} = require("../models/users.models.js");

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
};

const getUserByEmail = (req, res, next) => {
  const { email } = req.params;
  selectUserByEmail(email)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};

const postUserByEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ msg: "Bad Request" });
  }
  insertUserByEmail(email)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getAllUsers, getUserByEmail, postUserByEmail };
