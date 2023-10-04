const express = require("express");
const router = express.Router();

const {
  getUserByEmail,
  postUserByEmail,
  postUser,
  getAllUsers
} = require("../controllers/users.controllers");

router.get("/email/:email", getUserByEmail);
router.post("/newuser", postUser)
router.post("/email", postUserByEmail);
router.get("", getAllUsers);

module.exports = router;
