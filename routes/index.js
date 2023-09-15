const apiRouter = require("express").Router();
const studentsRouter = require("./students.router");

apiRouter.use("/student", studentsRouter);

module.exports = apiRouter;
