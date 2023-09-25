const apiRouter = require("express").Router();
const studentsRouter = require("./students.router");
const usersRouter = require("./users.routes");
const lessonsRouter = require("./lessons.routes");
const assignmentsRouter = require("./assignments.routes");
const assignmentsidRouter = require("./assignmentsid.routes");
const classesRouter = require("./classes.routes");

const endpoints = require("../endpoints.json");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ endpoints });
});

apiRouter.use("/student", studentsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/lessons", lessonsRouter);
apiRouter.use("/assignments", assignmentsRouter);
apiRouter.use("/assignmentsid", assignmentsidRouter);
apiRouter.use("/classes", classesRouter);

apiRouter.use((req, res) => {
  res.status(404).send({ msg: "Not found" });
});

module.exports = apiRouter;
