const { selectStudentsByClassID } = require("../models/classes.models.js");

const getStudentsByClassID = (req, res, next) => {
  const { class_id } = req.params;
  selectStudentsByClassID(class_id)
    .then((students) => {
      // console.log("🚀 ~ .then ~ students:", students);

      res.status(200).send({ students });
    })
    .catch((error) => {
      // console.log("🚀 ~ getStudentsByClassID ~ error:", error);
      next(error);
    });
};

module.exports = { getStudentsByClassID };
