const express = require('express');
const app = express();
app.use(express.json());
const { getAllUsers } = require('./controllers/users.controllers.js');
const { getLessonByID } = require('./controllers/lessons.lesson_ID.controller.js');

app.get('/api/users', getAllUsers)

app.get('/api/lessons/:id', getLessonByID)

app.use((req, res) => {
    res.status(404).send({msg: 'not found'})
})

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
      res.status(err.status).send({msg: 'not found'})
  }
  else next(err)
})

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23503") {
      res.status(400).send({msg: 'Invalid input'})
  } else if (err.code === "23502") {
      res.status(404).send({msg: 'not found'})
  }
  else next(err)
})

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "server error getting API" });
});

module.exports = app;