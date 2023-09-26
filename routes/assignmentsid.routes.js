const {
  patchAssignmentByIdAsTeacher,
  patchAssignmentByIdAsStudent,
  getAssignmentById,
} = require("../controllers/assignments.controllers");

const assignmentsidRouter = require("express").Router();

assignmentsidRouter.patch("/:assignment_id", patchAssignmentByIdAsTeacher);
assignmentsidRouter.patch("/student/:assignment_id", patchAssignmentByIdAsStudent);
assignmentsidRouter.get("/:assignment_id", getAssignmentById);

module.exports = assignmentsidRouter;
