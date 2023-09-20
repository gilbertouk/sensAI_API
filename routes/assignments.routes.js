const { getAssignmentsByTeacherClassId } = require("../controllers/teachers.controllers");

const assignmentsRouter = require("express").Router();

assignmentsRouter.get("/:teacher_id/:class_id", getAssignmentsByTeacherClassId)


module.exports = assignmentsRouter;
