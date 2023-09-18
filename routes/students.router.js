const studentsRouter = require("express").Router();
const {
  getStudentAssignments,
} = require("../controllers/students.controllers");

studentsRouter.get("/:student_id/assignments", getStudentAssignments);

module.exports = studentsRouter;
