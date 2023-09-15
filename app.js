const express = require('express')
const {getAllUsers } = require('./controllers/users.controllers.js');
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());
app.use(express.json())
/*
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
*/
const express = require('express')
const {getAllUsers } = require('./controllers/users.controllers.js');
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());
app.use(express.json())

app.get('/api/users', getAllUsers)

app.use((req, res) => {
    res.status(404).send({msg: 'not found'})
})

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: 'does not exist in databse'})
    }
    else next(err)
})

app.use((err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23503") {
        res.status(400).send({msg: 'Invalid input'})
    } else if (err.code === "23502") {
        res.status(404).send({msg: 'does not exist in databse'})
    }
    else next(err)
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'server error getting API'})
})

module.exports = app;
