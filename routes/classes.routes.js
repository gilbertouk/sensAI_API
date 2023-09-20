const express = require("express");
const router = express.Router();
const { getClassesByTeacherID } = require("../controllers/classes.teacher_ID.controller.js");

router.get("/:teacher_id", (req, res, next) => {
  getClassesByTeacherID(req, res, next);
});
module.exports = router;