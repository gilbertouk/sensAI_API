const {
  fetchAllUsers,
  selectUserByEmail,
  insertUserByEmail,
  insertUser,
  updateUserById
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

const postUser = (req, res, next) => {
  const user = req.body;
  insertUser(user)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};

const patchUser = (req, res, next) => {
  const userId = req.params.user_id;
  const updatedData = req.body;

  updateUserById(userId, updatedData)
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).send(updatedUser);
      } else {
        res.status(404).send({ msg: "Not found" });
      }
    })
    .catch((error) => {
      next(error);
    });
};




module.exports = { getAllUsers, getUserByEmail, postUserByEmail, postUser, patchUser };


