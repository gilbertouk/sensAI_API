const { postAssignmentsByTeacherIDAndClassID } = require("../controllers/assignments.teacher_id.class_id.controller");
const {
  getAssignmentsByTeacherClassId,
  getAssignments,
  deleteAssignmentsByAssignmentIdAndUserId,
  deleteAssignmentsByAssignmentId,
} = require("../controllers/teachers.controllers");

const assignmentsRouter = require("express").Router();

assignmentsRouter.get("/:teacher_id/:class_id", getAssignmentsByTeacherClassId);
assignmentsRouter.get("/:assignment_id/teacher/:teacher_id", getAssignments);
assignmentsRouter.post("/:teacher_id/:class_id", postAssignmentsByTeacherIDAndClassID);
assignmentsRouter.delete("/:assignment_id/:user_id", deleteAssignmentsByAssignmentIdAndUserId)
assignmentsRouter.delete("/:assignment_id", deleteAssignmentsByAssignmentId)

module.exports = assignmentsRouter;
