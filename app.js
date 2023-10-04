const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app); // socket.io
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
}); // socket.io

app.use(cors());
app.use(express.json());

const apiRouter = require("./routes");
const { getAPIRes } = require("./controllers/ai.controller.js");


app.post("/ai/assist", getAPIRes);

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

module.exports = { app, io, http };
