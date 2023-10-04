const express = require("express");
const router = express.Router();

const {
  getUserByEmail,
  postUserByEmail,
  postUser,
  getAllUsers,
  patchUser
} = require("../controllers/users.controllers");

router.get("/email/:email", getUserByEmail);
router.post("/newuser", postUser)
router.post("/email", postUserByEmail);
router.get("", getAllUsers);
router.patch("/:user_id", patchUser);

module.exports = router;
