const express = require("express");
const router = express.Router();

const {
  getLessonsByTeacherid,
} = require("../controllers/lessons.controllers.js");
const { getLessonByID } = require("../controllers/lessons.lesson_ID.controller.js");

router.get("/:teacher_id/:class_id", (req, res, next) => {
  getLessonsByTeacherid(req, res, next);
});

router.get("/:lesson_id", getLessonByID);

module.exports = router;
