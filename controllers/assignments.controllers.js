const {
  updateAssignmentByIdAsTeacher,
  selectAssignmentById,
} = require("../models/assignments.models");

const patchAssignmentByIdAsTeacher = (req, res, next) => {
  const { assignment_id } = req.params;
  const { mark, feedback } = req.body;

  updateAssignmentByIdAsTeacher(assignment_id, mark, feedback)
    .then((assignment) => {
      res.status(200).send({ assignment });
    })
    .catch((error) => {
      next(error);
    });
};

const getAssignmentById = (req, res, next) => {
  const { assignment_id } = req.params;
  selectAssignmentById(assignment_id)
    .then((assignment) => {
      res.status(200).send({ assignment });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { patchAssignmentByIdAsTeacher, getAssignmentById };
