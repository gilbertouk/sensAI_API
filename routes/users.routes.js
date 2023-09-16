const express = require("express");
const router = express.Router();

const {
  getUserByEmail,
  postUserByEmail,
} = require("../controllers/users.controllers");

router.get("/email/:email", getUserByEmail);
router.post("/email", postUserByEmail);

module.exports = router;
