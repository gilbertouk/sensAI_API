const express = require('express');
const cors = require('cors');

const articles = require('./routes/articles.routes');
const comments = require('./routes/comments.routes');
const endpoints = require('./routes/endpoints.routes');
const topics = require('./routes/topics.routes');
const users = require('./routes/users.routes');

const {
  generalError,
  Error400,
  Error404,
  Error500,
  pathError,
} = require('./errors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/articles', articles);
app.use('/api/comments', comments);
app.use('/api', endpoints);
app.use('/api/topics', topics);
app.use('/api/users', users);

app.all('*', pathError);
app.use(generalError);
app.use(Error400);
app.use(Error404);
app.use(Error500);

module.exports = app;
