const {
  selectLessonsByTeacherid,
  setLessonsByTeacherId,
} = require("../models/lessons.models.js");

const getLessonsByTeacherid = (req, res, next) => {
  const { teacher_id, class_id } = req.params;
  selectLessonsByTeacherid(teacher_id, class_id)
    .then((lessons) => {
      res.status(200).send({ lessons });
    })
    .catch((error) => {
      next(error);
    });
};

const postLessonsByTeacherIdAndClassId = (req, res, next) => {
  const { teacher_id, class_id } = req.params;
  const { title, body } = req.body;
  setLessonsByTeacherId(teacher_id, class_id, title, body)
    .then((lessons) => {
      res.status(200).send({ lessons });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getLessonsByTeacherid, postLessonsByTeacherIdAndClassId };
