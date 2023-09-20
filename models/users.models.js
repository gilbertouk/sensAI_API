const format = require('pg-format');

const db = require("../db/connection.js");

const fetchAllUsers = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
};

const selectUserByEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((response) => {
      if (response.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return response.rows[0];
    });
};

const insertUserByEmail = (email) => {
  return db
    .query("INSERT INTO users (email) VALUES ($1) RETURNING *", [email])
    .then(({ rows }) => {
        if (!rows) {
            return Promise.reject({
                status: 404,
                msg: 'Not found',
            })
        }

      return rows[0];
    });
};

const insertUser = (user) => {
  //return db
    //.query("INSERT INTO users (email) VALUES ($1) RETURNING *", [user])
    const insertQuery = format (`INSERT INTO users (email, name, surname, disability) 
    VALUES %L 
    RETURNING *`, [[user.email, user.name, user.surname, user.disability]]);
    console.log(insertQuery)
    return db.query(insertQuery)
    .then(({ rows }) => {
        if (!rows) {
            return Promise.reject({
                status: 404,
                msg: 'Not found',
            })
        }

      return rows[0];
    });
};



module.exports = { fetchAllUsers, selectUserByEmail, insertUser, insertUserByEmail };
