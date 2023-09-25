const {
  patchAssignmentByIdAsTeacher,
} = require("../controllers/assignments.controllers");

const assignmentsidRouter = require("express").Router();

assignmentsidRouter.patch("/:assignment_id", patchAssignmentByIdAsTeacher);

module.exports = assignmentsidRouter;
