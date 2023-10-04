const express = require("express");
const router = express.Router();

const {
  getLessonsByTeacherid, postLessonsByTeacherIdAndClassId,
} = require("../controllers/lessons.controllers.js");
const { getLessonByID } = require("../controllers/lessons.lesson_ID.controller.js");
const { deleteLessonByLessonIdAndUserId } = require("../controllers/lesson.lessonID.userID.controller.js");

router.get("/:teacher_id/:class_id", (req, res, next) => {
  getLessonsByTeacherid(req, res, next);
});

router.get("/:lesson_id", getLessonByID);

router.post("/:teacher_id/:class_id", postLessonsByTeacherIdAndClassId);

router.delete("/:lesson_id/:user_id", deleteLessonByLessonIdAndUserId)

module.exports = router;
