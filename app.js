const express = require("express");
const cors = require("cors");
const { getAllUsers } = require("./controllers/users.controllers.js");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/users", getAllUsers);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error getting API" });
});

module.exports = app;