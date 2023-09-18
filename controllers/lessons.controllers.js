const {
    selectLessonsByTeacherid
  } = require("../models/lessons.models.js");
  
const getLessonsByTeacherid = (req, res, next) => {
    const { teacher_id, class_id} = req.params;
    selectLessonsByTeacherid(teacher_id, class_id)
        .then((lessons) => {
          console.log(lessons)
        res.status(200).send({ lessons });
      })
      .catch((error) => {
        next(error);
      });
  };
  

  
  module.exports = { getLessonsByTeacherid };
  