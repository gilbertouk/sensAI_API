const express = require('express');
//const cors = require("cors");
//app.use(cors());
const app = express();
app.use(express.json());
//const apiRouter = require("./routes");
const { getAllUsers } = require('./controllers/users.controllers.js');
const { getLessonByID } = require('./controllers/lessons.lesson_ID.controller.js');
const { getClassesByTeacherID } = require('./controllers/classes.teacher_ID.controller.js');

app.get('/api/users', getAllUsers)

app.get('/api/lessons/:lesson_id', getLessonByID)

app.get('/api/classes/:teacher_id', getClassesByTeacherID)
// router
//app.use("/api", apiRouter);


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


module.exports = app;