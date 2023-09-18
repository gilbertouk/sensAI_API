const apiRouter = require("express").Router();
const studentsRouter = require("./students.router");
const usersRouter = require("./users.routes");

const endpoints = require("../endpoints.json");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ endpoints });
});

apiRouter.use("/student", studentsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use((req, res) => {
  res.status(404).send({ msg: "Not found" });
});

module.exports = apiRouter;
