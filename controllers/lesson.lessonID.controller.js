const {removeLessonByLessonId} = require("../models/lesson.lessonID.model")

deleteLessonByLessonId = (req, res, next) => {
    const { lesson_id } = req.params;
    removeLessonByLessonId(lesson_id)
      .then(() => {
        res.status(204).send({});
      })
      .catch((err) => {
        next(err);
      });
  };

module.exports = {deleteLessonByLessonId}