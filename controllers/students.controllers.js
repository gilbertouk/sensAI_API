const { fetchStudentAssignments } = require("../models/students.models");

const getStudentAssignments = (req, res, next) => {
  const { student_id } = req.params;
  fetchStudentAssignments(student_id)
    .then((assignments) => {
      res.status(200).send({ assignments });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getStudentAssignments };
