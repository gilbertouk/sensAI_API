const express = require("express");
const router = express.Router();

const {
  getLessonsByTeacherid,
} = require("../controllers/lessons.controllers.js");

router.get("/:teacher_id/:class_id", (req, res, next) => {
  getLessonsByTeacherid(req, res, next);
});
module.exports = router;
