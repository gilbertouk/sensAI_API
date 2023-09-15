
const express = require('express');
const { getAllUsers } = require('./controllers/users.controllers.js');
const app = express();
app.use(express.json());

app.get('/api/users', getAllUsers)

app.use((req, res) => {
    res.status(404).send({msg: 'not found'})
})

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "server error getting API" });
});

module.exports = app;