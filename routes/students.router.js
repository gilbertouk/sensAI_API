const studentsRouter = require("express").Router();
const { getLessonsByStudentId } = require("../controllers/getLessonsByStudentId");
const {
  getStudentAssignments,
  getStudentAssignmentByAssignmentId,
  patchStudentAssignment,
} = require("../controllers/students.controllers");

studentsRouter.get("/:student_id/assignments", getStudentAssignments);
studentsRouter.get(
  "/:student_id/assignments/:assignment_id",
  getStudentAssignmentByAssignmentId
);

studentsRouter.patch(
  "/:student_id/assignments/:assignment_id",
  patchStudentAssignment
);

studentsRouter.get("/:student_id/lessons", getLessonsByStudentId)

module.exports = studentsRouter;
