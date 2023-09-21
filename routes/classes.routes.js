const express = require("express");
const router = express.Router();
const {
  getClassesByTeacherID,
} = require("../controllers/classes.teacher_ID.controller.js");
const { getStudentsByClassID } = require("../controllers/classes.controllers");
router.get("/:teacher_id", (req, res, next) => {
  getClassesByTeacherID(req, res, next);
});
router.get("/:teacher_id/:class_id", (req, res, next) => {
  getStudentsByClassID(req, res, next);
});
module.exports = router;
