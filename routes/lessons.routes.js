const express = require("express");
const router = express.Router();

const {
  getLessonsByTeacherid
} = require("../controllers/lessons.controllers");

router.get("/classes/:teacher_id/:class_id/lessons", getLessonsByTeacherid);


module.exports = router;
