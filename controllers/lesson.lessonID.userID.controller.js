const {removeLessonByLessonIdAndUserId} = require("../models/lesson.lessonID.userID.model")

deleteLessonByLessonIdAndUserId = (req, res, next) => {
    const { lesson_id, user_id } = req.params;
    removeLessonByLessonIdAndUserId(lesson_id, user_id)
      .then(() => {
        res.status(204).send({});
      })
      .catch((err) => {
        next(err);
      });
  };

module.exports = {deleteLessonByLessonIdAndUserId}