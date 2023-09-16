const express = require("express");
const router = express.Router();

const { getUserByEmail } = require("../controllers/users.controllers");

router.get("/email/:email", getUserByEmail);

module.exports = router;
