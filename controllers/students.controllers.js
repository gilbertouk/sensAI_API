const assignments = require("../db/data/test-data/assignments");
const {
  fetchStudentAssignments,
  fetchStudentAssignmentByAssignmentId,
  updateStudentAssignment,
} = require("../models/students.models");

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

const getStudentAssignmentByAssignmentId = (req, res, next) => {
  const { student_id, assignment_id } = req.params;
  fetchStudentAssignmentByAssignmentId(student_id, assignment_id)
    .then((assignment) => {
      res.status(200).send({ assignment });
    })
    .catch((err) => {
      next(err);
    });
};

const patchStudentAssignment = (req, res, next) => {
  const { student_id, assignment_id } = req.params;
  const { work } = req.body;
  updateStudentAssignment(student_id, assignment_id, work)
    .then((assignment) => {
      res.status(200).send({ assignment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getStudentAssignments,
  getStudentAssignmentByAssignmentId,
  patchStudentAssignment,
};
