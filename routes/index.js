const apiRouter = require("express").Router();
const studentsRouter = require("./students.router");

apiRouter.use("/student", studentsRouter);

apiRouter.use((req, res) => {
  res.status(404).send({ msg: "Not found" });
});

module.exports = apiRouter;
