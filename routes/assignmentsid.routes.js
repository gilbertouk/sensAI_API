const {
  patchAssignmentByIdAsTeacher,
  getAssignmentById,
} = require("../controllers/assignments.controllers");

const assignmentsidRouter = require("express").Router();

assignmentsidRouter.patch("/:assignment_id", patchAssignmentByIdAsTeacher);
assignmentsidRouter.get("/:assignment_id", getAssignmentById);

module.exports = assignmentsidRouter;
