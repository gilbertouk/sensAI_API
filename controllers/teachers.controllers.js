const {
  getAssignDataByTeacherClass,
  getAssignmentData,
  deleteUserAssignmentByUserIdAndAssignmentId,
} = require("../models/teachers.models");

exports.getAssignmentsByTeacherClassId = (req, res, next) => {
  const { teacher_id, class_id } = req.params;

  getAssignDataByTeacherClass(teacher_id, class_id)
    .then((assignments) => {
      res.status(200).send({ assignments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteAssignmentsByAssignmentIdAndUserId = (req, res, next) => {
  const { assignment_id, user_id } = req.params;
  deleteUserAssignmentByUserIdAndAssignmentId(assignment_id, user_id)
    .then(() => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAssignments = (req, res, next) => {
  const { teacher_id } = req.params;
  getAssignmentData(teacher_id)
    .then((assignments) => {
      res.status(200).send({ assignments });
    })
    .catch((err) => {
      next(err);
    });
};
