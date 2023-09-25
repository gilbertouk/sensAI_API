const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app); // socket.io
const PORT = 4000;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
}); // socket.io

app.use(cors());
app.use(express.json());

const { getAllUsers } = require("./controllers/users.controllers.js");
const {
  getLessonByID,
} = require("./controllers/lessons.lesson_ID.controller.js");
const {
  getClassesByTeacherID,
} = require("./controllers/classes.teacher_ID.controller.js");
const {
  postAssignmentsByTeacherIDAndClassID,
} = require("./controllers/assignments.teacher_id.class_id.controller.js");
const {
  postLessonsByTeacherIdAndClassId,
} = require("./controllers/lessons.controllers.js");
const {
  deleteAssignmentsByAssignmentIdAndUserId,
  deleteAssignmentsByAssignmentId,
} = require("./controllers/teachers.controllers");
const {
  deleteLessonByLessonIdAndUserId,
} = require("./controllers/lesson.lessonID.userID.controller.js");
const {
  deleteLessonByLessonId,
} = require("./controllers/lesson.lessonID.controller.js");

const apiRouter = require("./routes");

app.get("/api/users", getAllUsers);
app.get("/api/lessons/:lesson_id", getLessonByID);
app.get("/api/classes/:teacher_id", getClassesByTeacherID);
app.post(
  "/api/assignments/:teacher_id/:class_id",
  postAssignmentsByTeacherIDAndClassID
);
app.post(
  "/api/lessons/:teacher_id/:class_id",
  postLessonsByTeacherIdAndClassId
);
app.delete(
  "/api/assignments/:assignment_id/:user_id",
  deleteAssignmentsByAssignmentIdAndUserId
);
app.delete("/api/assignments/:assignment_id", deleteAssignmentsByAssignmentId);

app.delete("/api/lessons/:lesson_id/:user_id", deleteLessonByLessonIdAndUserId);

app.delete("/api/lessons/:lesson_id", deleteLessonByLessonId);

// router
app.use("/api", apiRouter);

//handle custom errors
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

//handle Database errors
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error getting API" });
});

http.listen(PORT, () => {
  console.log(`Socket.IO listening on ${PORT}`);
});

module.exports = { app, io };
