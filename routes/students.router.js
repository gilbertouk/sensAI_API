const studentsRouter = require("express").Router();
const {
  getStudentAssignments,
  getStudentAssignmentByAssignmentId,
} = require("../controllers/students.controllers");

studentsRouter.get("/:student_id/assignments", getStudentAssignments);
studentsRouter.get(
  "/:student_id/assignments/:assignment_id",
  getStudentAssignmentByAssignmentId
);

module.exports = studentsRouter;
